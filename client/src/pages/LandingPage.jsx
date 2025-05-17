import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Features from "../components/Features.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import Footer from "../components/Footer.jsx";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import {
  ArrowRight,
  Sparkles,
  ArrowDown,
  Flame,
  Leaf,
  Wind,
  Sunrise,
} from "lucide-react";
export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <section>
        {/* Éléments nostalgiques */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-md mx-auto opacity-40 hover:opacity-60 transition-opacity duration-700 absolute bottom-32 left-1/2 transform -translate-x-1/2">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="aspect-square rounded-md overflow-hidden relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
              <div className="absolute inset-0 bg-pink-900/20 mix-blend-overlay"></div>
              <div className="absolute bottom-2 left-2 right-2 text-xs text-white/70 font-mono z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                memory_{Math.floor(Math.random() * 1000)}.jpg
              </div>
            </motion.div>
          ))}
        </div>

        {/* Effet de vignette pour renforcer l'aspect mélancolique */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent to-black opacity-60 z-10"></div>

        {/* Effet de lignes horizontales comme sur les vieilles TV */}
        <div className="absolute inset-0 pointer-events-none z-10 bg-[url('/images/scanlines.png')] bg-repeat opacity-[0.03]"></div>

        {/* Effet de poussière flottante */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </section>

      {/* Section de transition */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Sparkles className="h-10 w-10 text-pink-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Libérez-vous du poids du passé
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Parfois, la meilleure façon d'avancer est de laisser aller.
                Notre plateforme vous aide à créer un rituel de libération pour
                tout ce qui vous retient.
              </p>

              {/* Citation inspirante */}
              <div className="relative my-12 px-8 py-6 border-l-4 border-pink-500 bg-gray-900/50 rounded-r-lg">
                <div className="absolute -left-5 -top-5 text-6xl text-pink-500/20 font-serif">
                  "
                </div>
                <p className="text-xl italic text-gray-300">
                  Tourner la page n'est pas un acte d'oubli, mais un acte de
                  libération.
                </p>
                <div className="absolute -right-5 -bottom-5 text-6xl text-pink-500/20 font-serif">
                  "
                </div>
              </div>

              {/* Statistiques */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                {[
                  { number: "10K+", label: "Pages créées" },
                  { number: "94%", label: "Utilisateurs libérés" },
                  { number: "3x", label: "Plus de légèreté" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-fuchsia-400 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Éléments décoratifs */}
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent"></div>
        <div className="absolute -top-10 left-1/4 w-64 h-64 bg-pink-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-10 right-1/4 w-64 h-64 bg-fuchsia-500/10 rounded-full filter blur-3xl"></div>
      </section>

      {/* Section Comment ça marche avec une approche visuelle */}
      <section className="relative py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Comment ça marche
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Trois étapes simples pour vous libérer et commencer un nouveau
                chapitre
              </p>
            </motion.div>

            {/* Étapes avec animation */}
            <div className="relative">
              {/* Ligne de connexion */}
              <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 hidden md:block"></div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  {
                    icon: (
                      <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center">
                        <span className="text-2xl font-bold text-pink-400">
                          1
                        </span>
                      </div>
                    ),
                    title: "Créez",
                    description:
                      "Choisissez ce dont vous voulez vous libérer et personnalisez votre page",
                  },
                  {
                    icon: (
                      <div className="w-16 h-16 rounded-full bg-fuchsia-500/20 flex items-center justify-center">
                        <span className="text-2xl font-bold text-fuchsia-400">
                          2
                        </span>
                      </div>
                    ),
                    title: "Exprimez",
                    description:
                      "Écrivez ce que vous ressentez, ajoutez des images ou des symboles",
                  },
                  {
                    icon: (
                      <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <span className="text-2xl font-bold text-purple-400">
                          3
                        </span>
                      </div>
                    ),
                    title: "Libérez-vous",
                    description:
                      "Partagez ou gardez privé, puis tournez la page définitivement",
                  },
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    className="relative z-10 bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-pink-500/50 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 30px -10px rgba(236,72,153,0.2)",
                    }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-6">{step.icon}</div>
                      <h3 className="text-xl font-bold mb-4 text-white">
                        {step.title}
                      </h3>
                      <p className="text-gray-400">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => navigate("/create")}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:from-pink-600 hover:to-fuchsia-600 rounded-lg text-white font-bold shadow-lg shadow-pink-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/40 hover:-translate-y-1"
              >
                Commencer ma libération
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="relative py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ils ont tourné la page
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Découvrez comment notre plateforme a aidé d'autres personnes à
                se libérer
              </p>
            </motion.div>

            {/* Témoignages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  quote:
                    "Après des années à ruminer sur un projet qui n'a jamais abouti, j'ai enfin pu tourner la page et me concentrer sur de nouvelles opportunités.",
                  author: "Marie L.",
                  role: "Entrepreneure",
                  avatar: "https://randomuser.me/api/portraits/women/44.jpg",
                },
                {
                  quote:
                    "Cette plateforme m'a aidé à faire mon deuil d'une relation toxique. Le rituel de libération a été cathartique et puissant.",
                  author: "Thomas R.",
                  role: "Designer",
                  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                },
                {
                  quote:
                    "J'ai quitté un emploi qui me rendait malheureux depuis des années. Créer ma page de libération a été le premier pas vers une nouvelle vie.",
                  author: "Sophie M.",
                  role: "Développeuse",
                  avatar: "https://randomuser.me/api/portraits/women/68.jpg",
                },
                {
                  quote:
                    "Parfois, il faut savoir lâcher prise. Cette plateforme m'a donné le cadre dont j'avais besoin pour avancer.",
                  author: "Lucas K.",
                  role: "Étudiant",
                  avatar: "https://randomuser.me/api/portraits/men/75.jpg",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-pink-500/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-4 text-pink-400">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.59 4.59A2 2 0 1 1 11 8H8a6 6 0 0 0 6 6v-2a4 4 0 0 1-4-4V4.59z"
                          fill="currentColor"
                        />
                        <path
                          d="M15.59 4.59A2 2 0 1 1 17 8h-3a6 6 0 0 0 6 6v-2a4 4 0 0 1-4-4V4.59z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-300 italic mb-6 flex-grow">
                      {testimonial.quote}
                    </p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="w-10 h-10 rounded-full mr-4 border-2 border-pink-500/30"
                      />
                      <div>
                        <div className="font-medium text-white">
                          {testimonial.author}
                        </div>
                        <div className="text-sm text-gray-400">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Éléments décoratifs */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute -bottom-20 right-1/3 w-80 h-80 bg-pink-500/10 rounded-full filter blur-3xl"></div>
      </section>

      {/* Section FAQ */}
      <section className="relative py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Questions fréquentes
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Tout ce que vous devez savoir pour commencer votre processus de
                libération
              </p>
            </motion.div>

            {/* Questions */}
            <div className="space-y-6">
              {[
                {
                  question: "Est-ce que ma page sera publique ?",
                  answer:
                    "Vous avez le choix. Vous pouvez créer une page privée, uniquement accessible via un lien, ou la rendre publique dans notre galerie d'exemples.",
                },
                {
                  question:
                    "Combien de temps ma page restera-t-elle en ligne ?",
                  answer:
                    "Vous décidez. Vous pouvez choisir une durée limitée (symbolisant le processus de lâcher prise) ou la garder indéfiniment.",
                },
                {
                  question: "Puis-je personnaliser l'apparence de ma page ?",
                  answer:
                    "Absolument ! Nous proposons de nombreux thèmes, animations et options de personnalisation pour que votre page reflète parfaitement vos émotions.",
                },
                {
                  question: "Est-ce vraiment efficace pour tourner la page ?",
                  answer:
                    "De nombreux utilisateurs rapportent un sentiment de libération après avoir créé leur page. Le processus créatif et symbolique aide à matérialiser l'acte de lâcher prise.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden hover:border-pink-500/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 text-white font-medium cursor-pointer list-none">
                      <span>{faq.question}</span>
                      <span className="transition group-open:rotate-180">
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="text-pink-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-gray-400">{faq.answer}</div>
                  </details>
                </motion.div>
              ))}
            </div>

            {/* CTA final */}
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-300 mb-6">
                Prêt à tourner la page et à commencer un nouveau chapitre ?
              </p>
              <button
                onClick={() => navigate("/create")}
                className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-fuchsia-600 text-white font-bold shadow-lg transition-all duration-300 hover:shadow-pink-500/50"
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                <span className="relative flex items-center">
                  Créer ma page maintenant
                  <svg
                    className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    ></path>
                  </svg>
                </span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Éléments décoratifs */}
        <div className="absolute top-1/2 left-10 w-20 h-20 rounded-full bg-pink-500/10 blur-xl"></div>
        <div className="absolute top-1/3 right-10 w-32 h-32 rounded-full bg-fuchsia-500/10 blur-xl"></div>
      </section>

      {/* Section Newsletter */}
      <section className="relative py-20 bg-gradient-to-b from-black to-gray-950 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-fuchsia-500/5"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/20 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                  Restez inspiré
                </h2>
                <p className="text-gray-300 mb-0">
                  Recevez des conseils pour vous libérer du passé et des idées
                  pour créer votre page parfaite.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <form className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="flex-grow px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-lg transition-colors duration-300"
                  >
                    S'abonner
                  </button>
                </form>
                <p className="text-gray-500 text-sm mt-3">
                  Nous respectons votre vie privée. Désabonnez-vous à tout
                  moment.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Overlay de grain subtil sur toute la page */}
      <div className="fixed inset-0 bg-[url('/images/noise.png')] bg-repeat opacity-[0.02] mix-blend-overlay pointer-events-none z-50"></div>

      {/* Bouton flottant */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
      >
        <button
          onClick={() => navigate("/create")}
          className="group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white shadow-lg hover:shadow-pink-500/30 transition-all duration-300 hover:scale-110"
          aria-label="Créer ma page"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          <span className="absolute right-full mr-3 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Créer ma page
          </span>
        </button>
      </motion.div>
    </>
  );
}
