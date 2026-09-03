package com.resume_ai_backend.resume_ai_backend.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.openai.api.ResponseFormat;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Service
public class ResumeServiceImpl implements ResumeService {

    private final ChatClient chatClient;
    private final ObjectMapper objectMapper;

    public ResumeServiceImpl(
            ChatClient.Builder builder,
            ObjectMapper objectMapper
    ) {
        this.chatClient = builder.build();
        this.objectMapper = objectMapper;
    }

    // =====================================================
    // MAIN METHOD
    // =====================================================

    @Override
    public Map<String, Object> generateResumeResponse(
            String userResumeDescription
    ) throws IOException {

        if (userResumeDescription == null ||
                userResumeDescription.isBlank()) {

            throw new IOException(
                    "User resume description cannot be empty."
            );
        }

        // -------------------------------------------------
        // LOAD PROMPT
        // -------------------------------------------------

        String promptTemplate =
                loadPromptFromFile("resume_prompt.txt");

        // -------------------------------------------------
        // INSERT USER DESCRIPTION
        // -------------------------------------------------

        String promptContent =
                putValuesToTemplate(
                        promptTemplate,
                        Map.of(
                                "userDescription",
                                userResumeDescription
                        )
                );

        // -------------------------------------------------
        // FIRST AI REQUEST
        // -------------------------------------------------

        String response = callAI(promptContent);

        System.out.println(
                "\n================ AI RESPONSE ================\n"
        );

        System.out.println(response);

        System.out.println(
                "\n==============================================\n"
        );

        // -------------------------------------------------
        // PARSE RESPONSE
        // -------------------------------------------------

        Map<String, Object> resumeData;

        try {

            resumeData =
                    parseResumeResponse(response);

        } catch (IOException e) {

            System.err.println(
                    "First AI response was invalid."
            );

            resumeData = null;
        }

        // -------------------------------------------------
        // RETRY IF INCOMPLETE
        // -------------------------------------------------

        if (resumeData == null ||
                !isCompleteResume(resumeData)) {

            System.out.println(
                    "AI response is incomplete. Retrying..."
            );

            String retryPrompt =
                    createRetryPrompt(
                            userResumeDescription
                    );

            String retryResponse =
                    callAI(retryPrompt);

            System.out.println(
                    "\n================ AI RETRY RESPONSE ================\n"
            );

            System.out.println(retryResponse);

            System.out.println(
                    "\n====================================================\n"
            );

            resumeData =
                    parseResumeResponse(retryResponse);
        }

        // -------------------------------------------------
        // FINAL VALIDATION
        // -------------------------------------------------

        if (!isCompleteResume(resumeData)) {

            throw new IOException(
                    "AI returned incomplete resume JSON. " +
                            "Required sections are missing."
            );
        }

        return resumeData;
    }

    // =====================================================
    // CALL AI
    // =====================================================

    private String callAI(String promptContent) {

        /*
         * IMPORTANT:
         *
         * We are using JSON OBJECT mode instead of JSON SCHEMA.
         *
         * This avoids the Groq 400 schema mismatch that you
         * are currently getting.
         */

        ResponseFormat responseFormat =
                ResponseFormat.builder()
                        .type(ResponseFormat.Type.JSON_OBJECT)
                        .build();

        OpenAiChatOptions options =
                OpenAiChatOptions.builder()
                        .model("openai/gpt-oss-20b")
                        .responseFormat(responseFormat)
                        .build();

        Prompt prompt =
                new Prompt(
                        promptContent,
                        options
                );

        String response =
                chatClient
                        .prompt(prompt)
                        .call()
                        .content();

        if (response == null ||
                response.isBlank()) {

            throw new RuntimeException(
                    "Groq returned an empty response."
            );
        }

        return response;
    }

    // =====================================================
    // LOAD PROMPT
    // =====================================================

    private String loadPromptFromFile(
            String filename
    ) throws IOException {

        ClassPathResource resource =
                new ClassPathResource(filename);

        if (!resource.exists()) {

            throw new IOException(
                    "Prompt file not found: " + filename
            );
        }

        try (var inputStream =
                     resource.getInputStream()) {

            return new String(
                    inputStream.readAllBytes(),
                    StandardCharsets.UTF_8
            );
        }
    }

    // =====================================================
    // REPLACE TEMPLATE VALUES
    // =====================================================

    private String putValuesToTemplate(
            String template,
            Map<String, String> values
    ) {

        String result = template;

        for (Map.Entry<String, String> entry :
                values.entrySet()) {

            result = result.replace(
                    "{{" + entry.getKey() + "}}",
                    entry.getValue()
            );
        }

        return result;
    }

    // =====================================================
    // RETRY PROMPT
    // =====================================================

    private String createRetryPrompt(
            String userDescription
    ) {

        return """
                You are an AI resume generation assistant.

                Generate a complete resume from the user's description.

                IMPORTANT RULES:

                1. Return ONLY valid JSON.
                2. Do NOT use Markdown.
                3. Do NOT use ```json.
                4. Do NOT add explanations.
                5. Do NOT add text before or after the JSON.
                6. The JSON MUST be complete.
                7. Do NOT stop in the middle of the response.
                8. Use ONLY information provided by the user.
                9. Do NOT invent information.
                10. Missing string values must be "".
                11. Missing arrays must be [].
                12. technologiesUsed MUST be an array.
                13. languages MUST contain objects with id and name.
                14. interests MUST contain objects with name.

                The JSON MUST contain exactly these top-level fields:

                personalInformation
                summary
                skills
                experience
                education
                certifications
                projects
                achievements
                languages
                interests

                Use this structure:

                {
                  "personalInformation": {
                    "fullName": "",
                    "email": "",
                    "phoneNumber": "",
                    "location": "",
                    "linkedin": "",
                    "gitHub": "",
                    "portfolio": ""
                  },

                  "summary": "",

                  "skills": [
                    {
                      "title": "",
                      "level": ""
                    }
                  ],

                  "experience": [
                    {
                      "jobTitle": "",
                      "company": "",
                      "location": "",
                      "duration": "",
                      "responsibility": ""
                    }
                  ],

                  "education": [
                    {
                      "degree": "",
                      "university": "",
                      "location": "",
                      "graduationYear": ""
                    }
                  ],

                  "certifications": [
                    {
                      "title": "",
                      "issuingOrganization": "",
                      "year": ""
                    }
                  ],

                  "projects": [
                    {
                      "title": "",
                      "description": "",
                      "technologiesUsed": [],
                      "githubLink": ""
                    }
                  ],

                  "achievements": [
                    {
                      "title": "",
                      "year": "",
                      "extraInformation": ""
                    }
                  ],

                  "languages": [
                    {
                      "id": 1,
                      "name": ""
                    }
                  ],

                  "interests": [
                    {
                      "name": ""
                    }
                  ]
                }

                USER DESCRIPTION:

                """ + userDescription;
    }

    // =====================================================
    // PARSE AI RESPONSE
    // =====================================================

    private Map<String, Object> parseResumeResponse(
            String response
    ) throws IOException {

        if (response == null ||
                response.isBlank()) {

            throw new IOException(
                    "AI returned an empty response."
            );
        }

        String cleanedResponse =
                cleanAiResponse(response);

        try {

            JsonNode jsonNode =
                    objectMapper.readTree(
                            cleanedResponse
                    );

            if (jsonNode == null ||
                    jsonNode.isNull()) {

                throw new IOException(
                        "AI returned null JSON."
                );
            }

            if (!jsonNode.isObject()) {

                throw new IOException(
                        "AI response is not a JSON object."
                );
            }

            return objectMapper.convertValue(
                    jsonNode,
                    new TypeReference<
                            Map<String, Object>
                            >() {}
            );

        } catch (Exception e) {

            System.err.println(
                    "\n================ INVALID AI JSON ================\n"
            );

            System.err.println(cleanedResponse);

            System.err.println(
                    "\n==================================================\n"
            );

            throw new IOException(
                    "AI returned invalid JSON: "
                            + e.getMessage(),
                    e
            );
        }
    }

    // =====================================================
    // VALIDATE COMPLETE RESUME
    // =====================================================

    private boolean isCompleteResume(
            Map<String, Object> resume
    ) {

        if (resume == null) {
            return false;
        }

        // -------------------------------------------------
        // REQUIRED TOP LEVEL KEYS
        // -------------------------------------------------

        String[] requiredKeys = {

                "personalInformation",
                "summary",
                "skills",
                "experience",
                "education",
                "certifications",
                "projects",
                "achievements",
                "languages",
                "interests"
        };

        for (String key : requiredKeys) {

            if (!resume.containsKey(key)) {

                System.out.println(
                        "Missing required key: " + key
                );

                return false;
            }
        }

        // -------------------------------------------------
        // PERSONAL INFORMATION
        // -------------------------------------------------

        Object personalInformation =
                resume.get("personalInformation");

        if (!(personalInformation instanceof Map)) {

            System.out.println(
                    "personalInformation is not an object."
            );

            return false;
        }

        // -------------------------------------------------
        // REQUIRED ARRAYS
        // -------------------------------------------------

        String[] arrayKeys = {

                "skills",
                "experience",
                "education",
                "certifications",
                "projects",
                "achievements",
                "languages",
                "interests"
        };

        for (String key : arrayKeys) {

            Object value = resume.get(key);

            if (!(value instanceof java.util.List)) {

                System.out.println(
                        key + " is not an array."
                );

                return false;
            }
        }

        return true;
    }

    // =====================================================
    // CLEAN AI RESPONSE
    // =====================================================

    private String cleanAiResponse(
            String response
    ) {

        String cleaned =
                response.trim();

        // Remove ```json

        if (cleaned.startsWith("```json")) {

            cleaned =
                    cleaned
                            .substring(7)
                            .trim();
        }

        // Remove ```

        else if (cleaned.startsWith("```")) {

            cleaned =
                    cleaned
                            .substring(3)
                            .trim();
        }

        // Remove ending ```

        if (cleaned.endsWith("```")) {

            cleaned =
                    cleaned.substring(
                            0,
                            cleaned.length() - 3
                    ).trim();
        }

        // Extract JSON object

        int firstBrace =
                cleaned.indexOf("{");

        int lastBrace =
                cleaned.lastIndexOf("}");

        if (firstBrace >= 0 &&
                lastBrace >= 0 &&
                lastBrace > firstBrace) {

            cleaned =
                    cleaned.substring(
                            firstBrace,
                            lastBrace + 1
                    );
        }

        return cleaned.trim();
    }
}