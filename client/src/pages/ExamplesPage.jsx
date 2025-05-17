import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function ExamplesPage() {
    const examples = [
        {
            title: "Farewell to My Startup Dream",
            tone: "Dramatic",
            preview: "After 3 years, 4 pivots, and countless sleepless nights, it's time to admit that my startup journey has come to an end...",
            author: "Alex Chen",
            image: "https://placehold.co/600x400/purple/white?text=Startup+Farewell"
        },
        {
            title: "So Long, Corporate Hell!",
            tone: "Ironic",
            preview: "After 5 years of pretending to care about KPIs, synergy, and team-building exercises, I'm finally breaking free...",
            author: "Jamie Smith",
            image: "https://placehold.co/600x400/red/white?text=Corporate+Escape"
        },
        {
            title: "My Last Commit",
            tone: "Touching",
            preview: "To the codebase I've nurtured for 7 years, and the team that became my second family...",
            author: "Taylor Wong",
            image: "https://placehold.co/600x400/blue/white?text=Last+Commit"
        },
        {
            title: "404: Relationship Not Found",
            tone: "Absurd",
            preview: "After 2 years of trying to debug our relationship, I'm implementing the final break() function...",
            author: "Jordan Lee",
            image: "https://placehold.co/600x400/green/white?text=404+Relationship"
        }
    ];

    return (
        <>
            <Navbar />
            <div className="min-h-screen pt-20 pb-10 bg-base-200">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center mb-4">
                        Example <span className="text-pink-500">TheEnd</span> Pages
                    </h1>
                    <p className="text-center mb-10 max-w-2xl mx-auto">
                        Browse through these examples to get inspired for your own farewell page. 
                        Each one showcases a different tone and style.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {examples.map((example, index) => (
                            <div key={index} className="card bg-base-100 shadow-xl overflow-hidden">
                                <figure>
                                    <img src={example.image} alt={example.title} className="w-full h-48 object-cover" />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{example.title}</h2>
                                    <div className="badge badge-secondary mb-2">{example.tone}</div>
                                    <p className="mb-4">{example.preview}</p>
                                    <div className="card-actions justify-between items-center">
                                        <div className="text-sm opacity-70">By {example.author}</div>
                                        <button className="btn btn-primary btn-sm">View Page</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <button className="btn btn-primary btn-lg">
                            Create Your Own Page
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}