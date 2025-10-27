import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
      isDone: a.boolean(), // ✅ Campo 'isDone' adicionado
    }).authorization(allow => [allow.owner()]),
}) // 🛑 CORRIGIDO: O fechamento do schema vem aqui
  .authorization((allow) => [allow.publicApiKey()]); // ✅ CORRIGIDO: O .authorization() é aplicado aqui
// ☝️ Repare que o ponto e vírgula foi movido para o final, e um '})' foi removido

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey", // ✅ Definindo apiKey como default
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
    // ⚠️ Atenção: você tinha 'defaultAuthorizationMode: 'userPool'' e depois o sobrescreveu com 'defaultAuthorizationMode: "apiKey"'. Mantive apenas o "apiKey".
  },
});

// ... (O restante do código STEP 2 e STEP 3 está correto e é opcional para o backend)
