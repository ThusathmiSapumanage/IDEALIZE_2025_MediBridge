package com.ngo.auth.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "ngos")
public class Ngo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ngo_id")
    private Integer ngoId;

    @Column(name = "ngo_name")
    private String ngoName;

    @Column(name = "ngo_email")
    private String ngoEmail;

    @Column(name = "ngo_password")
    private String ngoPassword;

    @Column(name = "ngo_location")
    private String ngoLocation;

    @Column(name = "ngo_phone")
    private String ngoPhone;

    @Column(name = "ngo_services")
    private String ngoServices;

    @Column(name = "created_at", insertable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp createdAt;

    public Integer getNgoId() {
        return ngoId;
    }

    public String getNgoName() {
        return ngoName;
    }

    public String getNgoEmail() {
        return ngoEmail;
    }

    public String getNgoPassword() {
        return ngoPassword;
    }

    public String getNgoLocation() {
        return ngoLocation;
    }

    public String getNgoPhone() {
        return ngoPhone;
    }

    public String getNgoServices() {
        return ngoServices;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setNgoId(Integer ngoId) {
        this.ngoId = ngoId;
    }

    public void setNgoName(String ngoName) {
        this.ngoName = ngoName;
    }

    public void setNgoEmail(String ngoEmail) {
        this.ngoEmail = ngoEmail;
    }

    public void setNgoPassword(String ngoPassword) {
        this.ngoPassword = ngoPassword;
    }

    public void setNgoLocation(String ngoLocation) {
        this.ngoLocation = ngoLocation;
    }

    public void setNgoPhone(String ngoPhone) {
        this.ngoPhone = ngoPhone;
    }

    public void setNgoServices(String ngoServices) {
        this.ngoServices = ngoServices;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }
}
