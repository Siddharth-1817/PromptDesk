package PromptDesk.dto;

public class AIAnalysisResponse {

    private String category;
    private String priority;
    private String sentiment;
    private String summary;
    private String suggestedResponse;

    public AIAnalysisResponse() {
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getSentiment() {
        return sentiment;
    }

    public void setSentiment(String sentiment) {
        this.sentiment = sentiment;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getSuggestedResponse() {
        return suggestedResponse;
    }

    public void setSuggestedResponse(String suggestedResponse) {
        this.suggestedResponse = suggestedResponse;
    }
}