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
        // CALL AI
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
        // PARSE JSON
        // -------------------------------------------------

        Map<String, Object> resumeData =
                parseResumeResponse(response);

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
    // CALL AI WITH STRICT JSON SCHEMA
    // =====================================================

    private String callAI(String promptContent) {

        /*
         * Groq supports OpenAI-compatible Structured Outputs.
         *
         * GPT-OSS-20B supports strict JSON schema output.
         */

        ResponseFormat.JsonSchema jsonSchema =
                ResponseFormat.JsonSchema
                        .builder()
                        .name("resume_response")
                        .schema(getResumeJsonSchema())
                        .strict(true)
                        .build();

        ResponseFormat responseFormat =
                new ResponseFormat();

        responseFormat.setType(
                ResponseFormat.Type.JSON_SCHEMA
        );

        responseFormat.setJsonSchema(
                jsonSchema
        );

        OpenAiChatOptions options =
                OpenAiChatOptions
                        .builder()
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
    // JSON SCHEMA
    // =====================================================

    private String getResumeJsonSchema() {

        return """
        {
          "type": "object",

          "properties": {

            "personalInformation": {
              "type": "object",

              "properties": {
                "fullName": {
                  "type": "string"
                },
                "email": {
                  "type": "string"
                },
                "phoneNumber": {
                  "type": "string"
                },
                "location": {
                  "type": "string"
                },
                "linkedin": {
                  "type": "string"
                },
                "gitHub": {
                  "type": "string"
                },
                "portfolio": {
                  "type": "string"
                }
              },

              "required": [
                "fullName",
                "email",
                "phoneNumber",
                "location",
                "linkedin",
                "gitHub",
                "portfolio"
              ],

              "additionalProperties": false
            },

            "summary": {
              "type": "string"
            },

            "skills": {
              "type": "array",

              "items": {
                "type": "object",

                "properties": {
                  "title": {
                    "type": "string"
                  },
                  "level": {
                    "type": "string"
                  }
                },

                "required": [
                  "title",
                  "level"
                ],

                "additionalProperties": false
              }
            },

            "experience": {
              "type": "array",

              "items": {
                "type": "object",

                "properties": {
                  "jobTitle": {
                    "type": "string"
                  },
                  "company": {
                    "type": "string"
                  },
                  "location": {
                    "type": "string"
                  },
                  "duration": {
                    "type": "string"
                  },
                  "responsibility": {
                    "type": "string"
                  }
                },

                "required": [
                  "jobTitle",
                  "company",
                  "location",
                  "duration",
                  "responsibility"
                ],

                "additionalProperties": false
              }
            },

            "education": {
              "type": "array",

              "items": {
                "type": "object",

                "properties": {
                  "degree": {
                    "type": "string"
                  },
                  "university": {
                    "type": "string"
                  },
                  "location": {
                    "type": "string"
                  },
                  "graduationYear": {
                    "type": "string"
                  }
                },

                "required": [
                  "degree",
                  "university",
                  "location",
                  "graduationYear"
                ],

                "additionalProperties": false
              }
            },

            "certifications": {
              "type": "array",

              "items": {
                "type": "object",

                "properties": {
                  "title": {
                    "type": "string"
                  },
                  "issuingOrganization": {
                    "type": "string"
                  },
                  "year": {
                    "type": "string"
                  }
                },

                "required": [
                  "title",
                  "issuingOrganization",
                  "year"
                ],

                "additionalProperties": false
              }
            },

            "projects": {
              "type": "array",

              "items": {
                "type": "object",

                "properties": {
                  "title": {
                    "type": "string"
                  },

                  "description": {
                    "type": "string"
                  },

                  "technologiesUsed": {
                    "type": "array",

                    "items": {
                      "type": "string"
                    }
                  },

                  "githubLink": {
                    "type": "string"
                  }
                },

                "required": [
                  "title",
                  "description",
                  "technologiesUsed",
                  "githubLink"
                ],

                "additionalProperties": false
              }
            },

            "achievements": {
              "type": "array",

              "items": {
                "type": "object",

                "properties": {
                  "title": {
                    "type": "string"
                  },

                  "year": {
                    "type": "string"
                  },

                  "extraInformation": {
                    "type": "string"
                  }
                },

                "required": [
                  "title",
                  "year",
                  "extraInformation"
                ],

                "additionalProperties": false
              }
            },

            "languages": {
              "type": "array",

              "items": {
                "type": "object",

                "properties": {
                  "id": {
                    "type": "integer"
                  },

                  "name": {
                    "type": "string"
                  }
                },

                "required": [
                  "id",
                  "name"
                ],

                "additionalProperties": false
              }
            },

            "interests": {
              "type": "array",

              "items": {
                "type": "object",

                "properties": {
                  "name": {
                    "type": "string"
                  }
                },

                "required": [
                  "name"
                ],

                "additionalProperties": false
              }
            }
          },

          "required": [
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
          ],

          "additionalProperties": false
        }
        """;
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
        // REQUIRED TOP-LEVEL KEYS
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