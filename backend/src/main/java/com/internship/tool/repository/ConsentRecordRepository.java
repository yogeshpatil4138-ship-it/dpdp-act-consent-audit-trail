package com.internship.tool.repository;

import com.internship.tool.entity.ConsentRecord;
import com.internship.tool.entity.ConsentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ConsentRecordRepository
        extends JpaRepository<ConsentRecord, Long> {

    // ── Paginated list — non-deleted only ────────────────────
    Page<ConsentRecord> findAllByDeletedFalse(Pageable pageable);

    // ── Single record — non-deleted only ────────────────────
    Optional<ConsentRecord> findByIdAndDeletedFalse(Long id);

    // ── Full-text search across name / email / purpose ───────
    @Query("""
        SELECT c FROM ConsentRecord c
        WHERE c.deleted = false
        AND (
            LOWER(c.subjectName)  LIKE LOWER(CONCAT('%', :query, '%'))
         OR LOWER(c.subjectEmail) LIKE LOWER(CONCAT('%', :query, '%'))
         OR LOWER(c.purpose)      LIKE LOWER(CONCAT('%', :query, '%'))
        )
        """)
    Page<ConsentRecord> searchByQuery(
        @Param("query") String query,
        Pageable pageable
    );

    // ── Filter by status ─────────────────────────────────────
    Page<ConsentRecord> findAllByStatusAndDeletedFalse(
        ConsentStatus status, Pageable pageable
    );

    // ── Expiry scheduler — records expiring in date range ────
    @Query("""
        SELECT c FROM ConsentRecord c
        WHERE c.deleted = false
        AND c.status = 'ACTIVE'
        AND c.expiryDate BETWEEN :today AND :deadline
        """)
    List<ConsentRecord> findExpiringSoon(
        @Param("today")    LocalDate today,
        @Param("deadline") LocalDate deadline
    );

    // ── AI retry scheduler ───────────────────────────────────
    @Query("""
        SELECT c FROM ConsentRecord c
        WHERE c.deleted = false
        AND c.aiProcessed = false
        """)
    List<ConsentRecord> findUnprocessedByAi();

    // ── Stats counts ─────────────────────────────────────────
    long countByDeletedFalse();

    long countByStatusAndDeletedFalse(ConsentStatus status);
}