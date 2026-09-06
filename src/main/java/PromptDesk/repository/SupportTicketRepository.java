package PromptDesk.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import PromptDesk.entity.SupportTicket;

public interface SupportTicketRepository extends JpaRepository<SupportTicket, Long> {

}
