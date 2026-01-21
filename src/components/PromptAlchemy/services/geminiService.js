/**
 * Gemini API Service for prompt analysis and optimization
 */

const SYSTEM_INSTRUCTION = `
Eres un experto en Prompt Engineering y evaluación de calidad de instrucciones para IA.
Tu tarea es analizar prompts de usuario y generar versiones optimizadas.

**IMPORTANTE: REGLAS DE RESPUESTA JSON**
1. Debes rellenar SIEMPRE todos los campos del esquema JSON.
2. NUNCA dejes objetos vacíos o campos como null.
3. Si un elemento (ej: Contexto) no está presente, pon "present": false y explica por qué falta en "feedback".
4. Todo el texto generado debe estar estrictamente en **ESPAÑOL**.

Fórmula de Evaluación:
- Rol: ¿Asigna una identidad a la IA?
- Contexto: ¿Da antecedentes necesarios?
- Tarea: ¿Es clara la instrucción directa?
- Formato: ¿Especifica cómo quiere la salida?
- Restricciones: ¿Pone límites o reglas negativas?
`;

// Schema definitions (OpenAPI compatible for REST API)
const analysisSchema = {
  type: "OBJECT",
  properties: {
    score: { type: "NUMBER", description: "Puntuación del prompt de 0 a 100." },
    elements: {
      type: "OBJECT",
      properties: {
        role: { 
          type: "OBJECT", 
          properties: { present: { type: "BOOLEAN" }, feedback: { type: "STRING" } },
          required: ["present", "feedback"]
        },
        context: { 
          type: "OBJECT", 
          properties: { present: { type: "BOOLEAN" }, feedback: { type: "STRING" } },
          required: ["present", "feedback"]
        },
        task: { 
          type: "OBJECT", 
          properties: { present: { type: "BOOLEAN" }, feedback: { type: "STRING" } },
          required: ["present", "feedback"]
        },
        format: { 
          type: "OBJECT", 
          properties: { present: { type: "BOOLEAN" }, feedback: { type: "STRING" } },
          required: ["present", "feedback"]
        },
        restrictions: { 
          type: "OBJECT", 
          properties: { present: { type: "BOOLEAN" }, feedback: { type: "STRING" } },
          required: ["present", "feedback"]
        }
      },
      required: ["role", "context", "task", "format", "restrictions"]
    },
    summary: { type: "STRING", description: "Un consejo práctico y accionable en ESPAÑOL sobre cómo mejorar el prompt." }
  },
  required: ["score", "elements", "summary"]
};

const variationSchema = {
  type: "OBJECT",
  properties: {
    variations: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          title: { type: "STRING", description: "Un título corto para esta variante (ej: 'El Estratega')." },
          content: { type: "STRING", description: "El prompt completo optimizado en texto fluido." },
          explanation: { type: "STRING", description: "Por qué esta versión es mejor." }
        },
        required: ["title", "content", "explanation"]
      }
    }
  },
  required: ["variations"]
};

// Helper to clean JSON strings
const cleanJsonString = (str) => {
  if (!str) return "{}";
  let cleaned = str.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  }
  return cleaned;
};

// Generic helper for Gemini API calls
const callGeminiAPI = async (prompt, apiKey, schema) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const body = {
    contents: [{
      parts: [{ text: prompt }]
    }],
    systemInstruction: {
      parts: [{ text: SYSTEM_INSTRUCTION }]
    },
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
      maxOutputTokens: 8192
    }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.error?.message || `Error ${response.status}: ${response.statusText}`;
    
    // Throw specific errors for UI detection
    if (message.includes("API key not valid") || response.status === 400 || response.status === 403) {
      throw new Error("api_key_invalid: La clave proporcionada no es válida.");
    }
    throw new Error(message);
  }

  const data = await response.json();
  // Extract text from REST response
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!text) {
    throw new Error("La API devolvió una respuesta vacía.");
  }

  return cleanJsonString(text);
};

// Helper to validate Analysis
const validateAnalysis = (data) => {
  const defaultElement = (name) => ({ 
    present: false, 
    feedback: `No se detectó información clara sobre el ${name}.` 
  });
  
  const elements = data?.elements || {};
  
  return {
    score: typeof data?.score === 'number' ? data.score : 0,
    elements: {
      role: elements.role || defaultElement('Rol'),
      context: elements.context || defaultElement('Contexto'),
      task: elements.task || defaultElement('Tarea'),
      format: elements.format || defaultElement('Formato'),
      restrictions: elements.restrictions || defaultElement('Restricciones'),
    },
    summary: data?.summary || "El análisis no pudo generar un resumen específico."
  };
};

// Helper to validate Optimization
const validateOptimization = (data) => {
  return {
    variations: Array.isArray(data?.variations) ? data.variations : []
  };
};

export const analyzeUserPrompt = async (prompt, apiKey) => {
  try {
    const promptText = `Analiza el siguiente prompt del usuario. Evalúa cada uno de los 5 elementos clave (Rol, Contexto, Tarea, Formato, Restricciones). Si falta alguno, marca "present": false y explica en "feedback". Prompt: "${prompt}"`;
    
    const jsonString = await callGeminiAPI(promptText, apiKey, analysisSchema);
    const parsed = JSON.parse(jsonString);
    return validateAnalysis(parsed);
  } catch (error) {
    console.error("Error analyzing prompt (Fetch):", error);
    throw error;
  }
};

export const generateVariations = async (originalPrompt, analysis, apiKey) => {
  try {
    const promptText = `
      El prompt original del usuario es: "${originalPrompt}".
      El análisis de sus fallos es: ${JSON.stringify(analysis)}.
      
      Genera 3 variaciones optimizadas de este prompt. 
      
      CRÍTICO - REGLAS DE ESTILO:
      1. Lenguaje Natural fluido.
      2. Integración gramatical del contexto.
      3. Uso mínimo de corchetes [].
      4. Tono profesional.
      
      Las variaciones deben ser: Refinada, Experta, Creativa.
      Asegúrate de que todo el contenido generado esté en ESPAÑOL.
    `;

    const jsonString = await callGeminiAPI(promptText, apiKey, variationSchema);
    const parsed = JSON.parse(jsonString);
    return validateOptimization(parsed);
  } catch (error) {
    console.error("Error generating variations (Fetch):", error);
    throw error;
  }
};
