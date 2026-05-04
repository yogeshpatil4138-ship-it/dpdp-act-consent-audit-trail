package com.internship.tool.repository;

import com.internship.tool.entity.AuditLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {

    List<AuditLog> findByEntityNameAndEntityIdOrderByPerformedAtDesc(
        String entityName, Long entityId
    );

    Page<AuditLog> findByPerformedByOrderByPerformedAtDesc(
        String performedBy, Pageable pageable
    );

    Page<AuditLog> findByActionOrderByPerformedAtDesc(
        String action, Pageable pageable
    );

    @Query("""
        SELECT a FROM AuditLog a
        WHERE a.performedAt BETWEEN :from AND :to
        ORDER BY a.performedAt DESC
        """)
    Page<AuditLog> findByDateRange(
        @Param("from") LocalDateTime from,
        @Param("to")   LocalDateTime to,
        Pageable pageable
    );
}