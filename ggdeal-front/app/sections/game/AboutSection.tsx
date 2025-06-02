import type { Game } from "~/types/Game";

export default function About({ game }: { game:Game }){
    return (
        <section className="w-full mx-auto px-8 mt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="col-span-1">
                        <h2 className="text-2xl font-bold mb-6 uppercase">ABOUT</h2>
                        <p className="text-lg leading-relaxed">
                            {game?.description}
                        </p>
                    </div>
                    
                    <div className="col-span-1 pl-0 md:pl-12">
                        <div className="mb-8">
                            <div className="flex items-center justify-between gap-4">
                                <h3 className="font-semibold text-base">Installation:</h3>
                                <p className="text-base">How to activate your product</p>
                            </div>
                        </div>
                        
                        <div className="mb-8">
                            <div className="flex items-center justify-between gap-4">
                                <h3 className="font-semibold text-base">Developer:</h3>
                                <p className="text-base">{game.development}</p>
                            </div>
                        </div>
                        
                        <div className="mb-8">
                            <div className="flex items-center justify-between gap-4">
                                <h3 className="font-semibold text-base">Publisher:</h3>
                                <p className="text-base">505 Games (PC), Sony</p>
                            </div>
                        </div>
                        
                        <div className="mb-8">
                            <div className="flex items-center justify-between gap-4">
                                <h3 className="font-semibold text-base">Release Date:</h3>
                                <p className="text-base">{game.releaseDate}</p>
                            </div>
                        </div>
                        
                        <div className="mb-8">
                            <div className="flex items-center justify-between gap-4">
                                <h3 className="font-semibold text-base">Genre:</h3>
                                <p className="text-base">{game.genre.name}</p>
                            </div>
                        </div>
                        
                        <div className="mb-8">
                            <div className="flex items-center justify-between gap-4">
                                <h3 className="font-semibold text-base">All Steam Reviews:</h3>
                                <p className="text-base">Very Positive</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    );
}