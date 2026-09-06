package PromptDesk.service;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import PromptDesk.dto.AIAnalysisResponse;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@Service
public class AIAnalysisService {

    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    public AIAnalysisService() {

        this.restClient = RestClient.builder()
                .baseUrl("http://localhost:11434")
                .build();

        this.objectMapper = new ObjectMapper();
    }

    public AIAnalysisResponse analyzeTicket(String title, String description) throws Exception {

        String prompt = """
                You are an AI customer-support ticket analysis assistant for PromptDesk.

                Analyze the following customer support ticket.

                Title:
                %s

                Description:
                %s

                Determine:

                1. Category:

                LOGIN:
                Use Login when the customer cannot log in, cannot sign in,
                forgot their password, has authentication problems,
                or cannot access their account because of login credentials.

                PAYMENT:
                Use Payment for payment failures, declined payments,
                billing problems, or payment-method issues.

                ORDER:
                Use Order for placing orders, modifying orders,
                order status, or order-related questions.

                DELIVERY:
                Use Delivery for shipping, delivery delays, tracking,
                or receiving an order.

                REFUND:
                Use Refund when the customer specifically asks about
                a refund, refund status, or returning money.

                ACCOUNT:
                Use Account for profile, account settings, personal information,
                or account-management issues that are NOT login problems.

                TECHNICAL:
                Use Technical for application errors, bugs, crashes,
                system failures, or technical problems that are NOT specifically
                related to login, payment, orders, delivery, refunds, or accounts.

                OTHER:
                Use Other when the issue does not fit any category above.

                2. Priority:

                LOW:
                General questions or simple requests with little impact.

                MEDIUM:
                A normal problem that requires support but does not seriously
                affect the customer's service.

                HIGH:
                A serious problem that significantly affects the customer's
                ability to use the service.

                URGENT:
                Security incidents, suspected fraud, major financial problems,
                complete service outages, or issues requiring immediate attention.

                3. Sentiment:

                Choose exactly one:

                POSITIVE
                NEUTRAL
                NEGATIVE

                4. Summary:

                Give a concise one-sentence summary.

                5. Suggested Response:

                Write a professional, polite and empathetic response for the customer.

                Return ONLY valid JSON.

                Use exactly this structure:

                {
                  "category": "string",
                  "priority": "string",
                  "sentiment": "string",
                  "summary": "string",
                  "suggestedResponse": "string"
                }
                """.formatted(title, description);

        // Create Ollama request JSON safely using Jackson
        Map<String, Object> requestBody = Map.of(
                "model", "llama3.2:3b",
                "prompt", prompt,
                "stream", false
        );

        String requestJson = objectMapper.writeValueAsString(requestBody);

        // Send request to Ollama
        String response = restClient.post()
                .uri("/api/generate")
                .body(requestJson)
                .retrieve()
                .body(String.class);

        // Read complete Ollama response
        JsonNode root = objectMapper.readTree(response);

        // Extract AI-generated response
        String aiJson = root.get("response").asText().trim();

        // Remove markdown code fences if the AI adds them
        if (aiJson.startsWith("```json")) {
            aiJson = aiJson.substring(7);
        }

        if (aiJson.startsWith("```")) {
            aiJson = aiJson.substring(3);
        }

        if (aiJson.endsWith("```")) {
            aiJson = aiJson.substring(0, aiJson.length() - 3);
        }

        aiJson = aiJson.trim();

        // Convert AI JSON into AIAnalysisResponse object
        return objectMapper.readValue(aiJson, AIAnalysisResponse.class);
    }
}