const { ChatMistralAI } = require("@langchain/mistralai");
require("dotenv").config();
const { PromptTemplate } = require("@langchain/core/prompts");
const { RunnableSequence } = require("@langchain/core/runnables");

//ton
//reaction
//description

const context = `
Ce matin, 9h pile.
Toute l’équipe est réunie dans la salle de brief de votre agence web.
Vous venez à peine de finir vos cafés que la cheffe de projet ouvre son ordi.

Objet : Nouvelle commande – URGENT
Bonjour l’équipe.
On a une idée un peu folle, mais on a besoin de vous pour la rendre réelle :
Un collègue claque sa démission ?
Un projet part en fumée en interne ?
Ou peut-être est-ce… une fin de couple.
Pas grave. On a la solution !

TheEnd.page, c’est la plateforme qui permet à toute personne qui quitte
quelque chose — un taf, un projet, une équipe, son conjoint, un canal Discord…
— de créer sur le site TheEnd.page, sa propre page de “départ” personnalisée.

Une page unique. Avec du style. De la rage. Des gifs. Des larmes. Des sons.
Des regrets. Ou pas.
Bref, un dernier mot… avant de claquer la porte.

L’utilisateur ou l’utilisatrice doit pouvoir choisir son ton (dramatique,
ironique, ultra cringe, classe, touchant, assertive, passif-agressif ou juste
honnête : à chacun·e son style…) raconter sa version de l’histoire, et partager
son lien unique.

Une landing page qu’on ne peut-être pas ouvrir… mais qu’on ouvre
quand même.
Une page qu’on partage. Une page qui claque.
Parce que si c’est la fin, autant la rendre inoubliable…
Et cliquable.
`;
const openedDoor = async (req, res) => {
  const prompt = PromptTemplate.fromTemplate(
    `Génère un composant JSX basé sur le contexte suivant : {context}.
     Le style visuel doit correspondre au ton : {ton}, que tu utiliseras pour adapter l'apparence du composant.
     Ajoute des éléments décoratifs pour le rendre visuellement éclatant, selon le ton choisi.
     Inclue obligatoirement cette phrase dans le contenu : "{description}".
     Tu peux aussi intégrer d’autres éléments si tu estimes qu’ils améliorent l’apparence ou l’ambiance.
     Le style doit être fait en CSS pur intégré dans le JSX (via <style> dans le même fichier).
     Pas d’intro, juste le code HTML + CSS.
     Favorise un composant long et riche, avec des couleurs vives, complémentaires, et une excellente UX/UI
    `
  );

  // Formater le prompt avec une valeur

  const chat = new ChatMistralAI({
    model: "mistral-large-latest", //"mistral-large-latest", // "open-mistral-7b", //
    temperature: 0,
    apiKey: "1RjR1zvbzYa70GvCCjjAuW86RBJ4RsV9",
  });

  const chain = RunnableSequence.from([prompt, chat]);

  async function run() {
    const res = await chain.invoke({
      ton: "triste",
      context: context,
      description: "Je suis triste de partir mais je dois le faire",
    });
    console.log(res.content);
  }

  run();
};
openedDoor();

module.exports = { openedDoor };
