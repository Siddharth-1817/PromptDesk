package PromptDesk.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import PromptDesk.dto.AIAnalysisResponse;
import PromptDesk.entity.SupportTicket;
import PromptDesk.service.AIAnalysisService;
import PromptDesk.service.SupportTicketService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/tickets")
public class SupportTicketController {

    private final SupportTicketService supportTicketService;

    private final AIAnalysisService aiAnalysisService;

    public SupportTicketController(
            SupportTicketService supportTicketService,
            AIAnalysisService aiAnalysisService) {

        this.supportTicketService = supportTicketService;
        this.aiAnalysisService = aiAnalysisService;
    }

    @PostMapping
    public SupportTicket createTicket(@RequestBody SupportTicket ticket) {

        return supportTicketService.createTicket(ticket);
    }

    @GetMapping
    public List<SupportTicket> getAllTickets() {

        return supportTicketService.getAllTickets();
    }

    @GetMapping("/{id}")
    public SupportTicket getTicketById(@PathVariable Long id) {

        return supportTicketService.getTicketById(id);
    }

    @PutMapping("/{id}")
    public SupportTicket updateTicket(
            @PathVariable Long id,
            @RequestBody SupportTicket updatedTicket) {

        return supportTicketService.updateTicket(id, updatedTicket);
    }

    @DeleteMapping("/{id}")
    public void deleteTicket(@PathVariable Long id) {

        supportTicketService.deleteTicket(id);
    }

    @PostMapping("/analyze")
    public AIAnalysisResponse analyzeTicket(
            @RequestBody SupportTicket ticket) throws Exception {

        return aiAnalysisService.analyzeTicket(
                ticket.getTitle(),
                ticket.getDescription()
        );
    }
}