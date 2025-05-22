export default function About(){
    return (
        <section className="w-full mx-auto px-8 mt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="col-span-1">
                        <h2 className="text-2xl font-bold mb-6 uppercase">ABOUT</h2>
                        <p className="text-lg leading-relaxed">
                            Death Stranding is an action game set in a post-apocalyptic United States, where mysterious invisible creatures begin to appear. You play as Sam Porter Bridges, a delivery man tasked with delivering vital supplies. The game explores themes of connection, loneliness, and survival, featuring an asynchronous online component in a shared gameplay where players can indirectly help each other across worlds.
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
                                <p className="text-base">Kojima Productions</p>
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
                                <p className="text-base">November 8, 2019</p>
                            </div>
                        </div>
                        
                        <div className="mb-8">
                            <div className="flex items-center justify-between gap-4">
                                <h3 className="font-semibold text-base">Genre:</h3>
                                <p className="text-base">Action / Adventure</p>
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