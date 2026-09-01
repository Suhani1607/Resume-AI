package com.resume_ai_backend.resume_ai_backend.controller;


import com.resume_ai_backend.resume_ai_backend.service.ResumeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/resume")
public class ResumeController {

   private final ResumeService resumeService;
    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping("/generate")
    public ResponseEntity<?> getResumeData(
            @RequestBody Map<String, Object> requestBody
    ) {

        try {

            // Support both "userDescription" and "description"
            String userDescription = null;

            if (requestBody.containsKey("userDescription")) {

                Object value = requestBody.get("userDescription");

                if (value != null) {
                    userDescription = value.toString();
                }

            } else if (requestBody.containsKey("description")) {

                Object value = requestBody.get("description");

                if (value != null) {
                    userDescription = value.toString();
                }

            } else {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "error", "Missing description",
                                "message",
                                "Request must contain 'userDescription' or 'description' field"
                        ));
            }

            // Validate description
            if (userDescription == null ||
                    userDescription.trim().isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "error", "Empty description",
                                "message",
                                "Description cannot be empty"
                        ));
            }

            // Generate resume
            Map<String, Object> resumeData =
                    resumeService.generateResumeResponse(
                            userDescription
                    );

            return ResponseEntity.ok(resumeData);

        } catch (Exception e) {

            // Print error in IntelliJ console
            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "error", "Internal Server Error",
                            "message",
                            e.getMessage() != null
                                    ? e.getMessage()
                                    : "An unexpected error occurred"
                    ));
        }
    }
}