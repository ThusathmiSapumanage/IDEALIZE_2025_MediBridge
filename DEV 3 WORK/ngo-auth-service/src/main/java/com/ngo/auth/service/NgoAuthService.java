package com.ngo.auth.service;

import com.ngo.auth.dto.NgoRegistrationRequest;
import com.ngo.auth.entity.Ngo;
import com.ngo.auth.repository.NgoRepository;
import com.ngo.auth.util.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class NgoAuthService {
    private final NgoRepository ngoRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public NgoAuthService(NgoRepository ngoRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.ngoRepository = ngoRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public String registerNgo(NgoRegistrationRequest request) {
        if (ngoRepository.findByNgoEmail(request.getNgoEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        Ngo ngo = new Ngo();
        ngo.setNgoName(request.getNgoName());
        ngo.setNgoEmail(request.getNgoEmail());
        ngo.setNgoPassword(passwordEncoder.encode(request.getNgoPassword()));
        ngo.setNgoLocation(request.getNgoLocation());
        ngo.setNgoPhone(request.getNgoPhone());
        ngo.setNgoServices(request.getNgoServices());

        ngoRepository.save(ngo);
        return "NGO registered successfully";
    }

    public String loginNgo(String ngoName, String password) {
        Ngo ngo = ngoRepository.findByNgoName(ngoName)
                .orElseThrow(() -> new RuntimeException("NGO not found"));

        if (passwordEncoder.matches(password, ngo.getNgoPassword())) {
            return jwtUtil.generateToken(ngo.getNgoName(), "ngo", ngo.getNgoId());
        }
        throw new RuntimeException("Invalid password");
    }

    public String updateNgo(Integer id, NgoRegistrationRequest request) {
        Ngo existingNgo = ngoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("NGO not found with ID: " + id));

        if (!existingNgo.getNgoEmail().equals(request.getNgoEmail()) &&
                ngoRepository.findByNgoEmail(request.getNgoEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        existingNgo.setNgoName(request.getNgoName());
        existingNgo.setNgoEmail(request.getNgoEmail());
        existingNgo.setNgoPassword(passwordEncoder.encode(request.getNgoPassword()));
        existingNgo.setNgoLocation(request.getNgoLocation());
        existingNgo.setNgoPhone(request.getNgoPhone());
        existingNgo.setNgoServices(request.getNgoServices());

        ngoRepository.save(existingNgo);
        return "NGO updated successfully";
    }

    public void deleteNgo(Integer id) {
        Ngo ngo = ngoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("NGO not found with ID: " + id));
        ngoRepository.delete(ngo);
    }

    public Ngo findNgoById(Integer id) {
        return ngoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("NGO not found with ID: " + id));
    }

    public Ngo findNgoByName(String name) {
        return ngoRepository.findByNgoName(name)
                .orElseThrow(() -> new RuntimeException("NGO not found with name: " + name));
    }
}