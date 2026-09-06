package PromptDesk.service;

import java.util.List;

import org.springframework.stereotype.Service;

import PromptDesk.dto.AIAnalysisResponse;
import PromptDesk.entity.SupportTicket;
import PromptDesk.exception.ResourceNotFoundException;
import PromptDesk.repository.SupportTicketRepository;

@Service
public class SupportTicketService {

    private final SupportTicketRepository supportTicketRepository;

    private final AIAnalysisService aiAnalysisService;

    public SupportTicketService(
            SupportTicketRepository supportTicketRepository,
            AIAnalysisService aiAnalysisService) {

        this.supportTicketRepository = supportTicketRepository;
        this.aiAnalysisService = aiAnalysisService;
    }

    public SupportTicket createTicket(SupportTicket ticket) {

        try {

            // Send ticket to AI for analysis
            AIAnalysisResponse analysis = aiAnalysisService.analyzeTicket(
                    ticket.getTitle(),
                    ticket.getDescription()
            );

            // Store AI results in the ticket
            ticket.setCategory(analysis.getCategory());
            ticket.setPriority(analysis.getPriority());
            ticket.setSentiment(analysis.getSentiment());
            ticket.setSummary(analysis.getSummary());
            ticket.setSuggestedResponse(analysis.getSuggestedResponse());

        } catch (Exception e) {

            System.out.println("AI analysis failed: " + e.getMessage());
        }

        // Save ticket to MySQL
        return supportTicketRepository.save(ticket);
    }

    public List<SupportTicket> getAllTickets() {

        return supportTicketRepository.findAll();
    }

    public SupportTicket getTicketById(Long id) {

        return supportTicketRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Ticket not found with id: " + id));
    }

    public SupportTicket updateTicket(
            Long id,
            SupportTicket updatedTicket) {

        SupportTicket existingTicket =
                supportTicketRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Ticket not found with id: " + id));

        existingTicket.setTitle(updatedTicket.getTitle());
        existingTicket.setDescription(updatedTicket.getDescription());
        existingTicket.setCategory(updatedTicket.getCategory());
        existingTicket.setPriority(updatedTicket.getPriority());
        existingTicket.setSentiment(updatedTicket.getSentiment());
        existingTicket.setSummary(updatedTicket.getSummary());
        existingTicket.setSuggestedResponse(
                updatedTicket.getSuggestedResponse());

        return supportTicketRepository.save(existingTicket);
    }

    public void deleteTicket(Long id) {

        supportTicketRepository.deleteById(id);
    }
}