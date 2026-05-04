package com.internship.tool.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "consent_records", indexes = {
    @Index(name = "idx_consent_subject_email", columnList = "subject_email"),
    @Index(name = "idx_consent_status",        columnList = "status"),
    @Index(name = "idx_consent_purpose",       columnList = "purpose"),
    @Index(name = "idx_consent_deleted",       columnList = "deleted")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConsentRecord extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ── Subject ──────────────────────────────────────────────
    @NotBlank
    @Column(name = "subject_name", nullable = false, length = 150)
    private String subjectName;

    @Email
    @NotBlank
    @Column(name = "subject_email", nullable = false, length = 200)
    private String subjectEmail;

    // ── Consent details ──────────────────────────────────────
    @NotBlank
    @Column(name = "purpose", nullable = false, length = 300)
    private String purpose;

    @Column(name = "data_categories", length = 500)
    private String dataCategories;

    @Column(name = "legal_basis", length = 100)
    private String legalBasis;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 30)
    private ConsentStatus status;

    // ── Dates ────────────────────────────────────────────────
    @Column(name = "consent_date")
    private LocalDate consentDate;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    @Column(name = "withdrawal_date")
    private LocalDate withdrawalDate;

    @Column(name = "deleted_at")
    private LocalDate deletedAt;

    // ── AI fields ────────────────────────────────────────────
    @Column(name = "ai_description", columnDefinition = "TEXT")
    private String aiDescription;

    @Column(name = "ai_recommendations", columnDefinition = "TEXT")
    private String aiRecommendations;

    @Column(name = "ai_report", columnDefinition = "TEXT")
    private String aiReport;

    @Column(name = "ai_processed", nullable = false)
    @Builder.Default
    private Boolean aiProcessed = false;

    // ── Soft delete ──────────────────────────────────────────
    @Column(name = "deleted", nullable = false)
    @Builder.Default
    private Boolean deleted = false;

    // ── Extra ────────────────────────────────────────────────
    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @Column(name = "collected_by", length = 150)
    private String collectedBy;

    @Version
    @Column(name = "version")
    private Long version;
}