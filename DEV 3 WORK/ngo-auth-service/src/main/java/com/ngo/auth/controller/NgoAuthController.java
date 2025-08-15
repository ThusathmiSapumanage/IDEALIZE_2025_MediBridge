package com.ngo.auth.controller;

import com.ngo.auth.dto.NgoLoginRequest;
import com.ngo.auth.dto.NgoRegistrationRequest;
import com.ngo.auth.entity.Ngo;
import com.ngo.auth.service.NgoAuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ngo")
public class NgoAuthController {
    private final NgoAuthService ngoAuthService;

    public NgoAuthController(NgoAuthService ngoAuthService) {
        this.ngoAuthService = ngoAuthService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerNgo(@Valid @RequestBody NgoRegistrationRequest request) {
        return ResponseEntity.ok(ngoAuthService.registerNgo(request));
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginNgo(@Valid @RequestBody NgoLoginRequest request) {
        return ResponseEntity.ok(ngoAuthService.loginNgo(
                request.getNgoName(),
                request.getNgoPassword()
        ));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateNgo(@PathVariable Integer id,
                                            @Valid @RequestBody NgoRegistrationRequest request) {
        return ResponseEntity.ok(ngoAuthService.updateNgo(id, request));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteNgo(@PathVariable Integer id) {
        ngoAuthService.deleteNgo(id);
        return ResponseEntity.ok("NGO deleted successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ngo> getNgoById(@PathVariable Integer id) {
        return ResponseEntity.ok(ngoAuthService.findNgoById(id));
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Ngo> getNgoByName(@PathVariable String name) {
        return ResponseEntity.ok(ngoAuthService.findNgoByName(name));
    }
}