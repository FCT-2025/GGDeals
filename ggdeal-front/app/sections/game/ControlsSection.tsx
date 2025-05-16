export default function Settings() {
    return (
            <section className="w-full mx-auto px-8 mt-16">
                <h2 className="text-2xl font-bold mb-6 uppercase">SETTINGS</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold mb-4">Minimum Requirements</h3>
                        
                        <div className="space-y-3 text-sm">
                            <div>
                                <span className="font-bold">OS:</span> Windows 10 64-bit
                            </div>
                            <div>
                                <span className="font-bold">Processor:</span> Intel Core i5-3470 or AMD Ryzen 3 1200
                            </div>
                            <div>
                                <span className="font-bold">Memory:</span> 8 GB RAM
                            </div>
                            <div>
                                <span className="font-bold">Graphics:</span> GeForce GTX 1050 3 GB or AMD Radeon RX 560 4 GB
                            </div>
                            <div>
                                <span className="font-bold">DirectX:</span> Version 12
                            </div>
                            <div>
                                <span className="font-bold">Storage:</span> 80 GB available space
                            </div>
                            <div>
                                <span className="font-bold">Additional Notes:</span> 720p (30-60FPS) with low settings
                            </div>
                        </div>
                    </div>
                    
                    {/* Recommended Requirements */}
                    <div className="col-span-1">
                        <h3 className="text-xl font-bold mb-4">Recommended Requirements</h3>
                        
                        <div className="space-y-3 text-sm">
                            <div>
                                <span className="font-bold">OS:</span> Windows 10 64-bit
                            </div>
                            <div>
                                <span className="font-bold">Processor:</span> Intel Core i7-3770 or AMD Ryzen 5 1600
                            </div>
                            <div>
                                <span className="font-bold">Memory:</span> 8 GB RAM
                            </div>
                            <div>
                                <span className="font-bold">Graphics:</span> GeForce GTX 1060 6 GB or AMD Radeon RX 590
                            </div>
                            <div>
                                <span className="font-bold">DirectX:</span> Version 12
                            </div>
                            <div>
                                <span className="font-bold">Storage:</span> 80 GB available space
                            </div>
                            <div>
                                <span className="font-bold">Additional Notes:</span> 1080p (30-60FPS) with medium to high settings
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    );
}