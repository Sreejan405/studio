'use client';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Sparkles, Bot, X, Camera, Send, User, Loader, CheckCircle2, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { skincareAssistant, SkincareAssistantOutput } from '@/ai/flows/skincare-assistant';
import Image from 'next/image';
import { getProductsByNames } from '@/lib/products';
import { useCart } from '@/hooks/use-cart';
import { cn } from '@/lib/utils';

type Message = {
    sender: 'user' | 'bot';
    text?: string;
    analysis?: SkincareAssistantOutput;
    isError?: boolean;
};

const SKIN_TYPES = ['Dry', 'Oily', 'Combination', 'Normal', 'Sensitive'];
const SKIN_CONCERNS = ['Acne', 'Aging', 'Dryness', 'Redness', 'Uneven Tone', 'Dark Circles'];

export default function AiChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [selectedSkinType, setSelectedSkinType] = useState<string | null>(null);
    const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        if(isOpen && messages.length === 0) {
            setMessages([{
                sender: 'bot',
                text: "Hi there! I'm your GlowNiva Expert. To give you the best routine, tell me a bit about your skin below, or just ask me anything!"
            }]);
        }
    }, [isOpen, messages.length]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast({
                    variant: 'destructive',
                    title: 'File too large',
                    description: 'Please upload an image smaller than 2MB.',
                });
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageUri(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleConcern = (concern: string) => {
        setSelectedConcerns(prev => 
            prev.includes(concern) ? prev.filter(c => c !== concern) : [...prev, concern]
        );
    };

    const handleSendMessage = async () => {
        if (!input.trim() && !imageUri && !selectedSkinType && selectedConcerns.length === 0) return;

        const userMsgText = input.trim();
        let displayMessage = userMsgText;
        
        if (!displayMessage) {
            if (selectedSkinType || selectedConcerns.length > 0) {
                displayMessage = `I have ${selectedSkinType?.toLowerCase() || 'unspecified'} skin with ${selectedConcerns.join(', ').toLowerCase() || 'no specific'} concerns.`;
            } else if (imageUri) {
                displayMessage = "Sent an image for analysis.";
            }
        }

        setMessages(prev => [...prev, { sender: 'user', text: displayMessage }]);
        setIsLoading(true);
        setInput('');

        try {
            const result = await skincareAssistant({
                userMessage: userMsgText || undefined,
                skinType: selectedSkinType || undefined,
                concerns: selectedConcerns.length > 0 ? selectedConcerns : undefined,
                photoDataUri: imageUri ?? undefined
            });
            setMessages(prev => [...prev, { sender: 'bot', analysis: result }]);
            setImageUri(null);
        } catch (error: any) {
            console.error("AI assistant error:", error);
            const errorMessage = error.message || "I'm sorry, I encountered an error. Please try again.";
            setMessages(prev => [...prev, { sender: 'bot', text: errorMessage, isError: true }]);
            
            if (errorMessage.toLowerCase().includes('configuration error')) {
                toast({
                  variant: "destructive",
                  title: "Configuration Error",
                  description: "The assistant is temporarily unavailable. Please contact the administrator."
                });
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="h-[90vh] max-w-2xl flex flex-col p-0 overflow-hidden sm:rounded-2xl border-none shadow-2xl">
                    <DialogHeader className="flex flex-row items-center justify-between border-b px-6 py-4 bg-primary/5">
                         <div className="space-y-0.5">
                             <DialogTitle className="flex items-center gap-2 text-xl font-headline">
                                <Sparkles className="h-5 w-5 text-primary" />
                                <span>GlowNiva Expert</span>
                            </DialogTitle>
                            <DialogDescription className="text-xs">
                                Personal routine builder & skin analysis.
                            </DialogDescription>
                         </div>
                    </DialogHeader>
                    
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border shadow-sm ${msg.sender === 'user' ? 'bg-background' : 'bg-primary/20'}`}>
                                    {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4 text-primary" />}
                                </div>
                                <div className={`rounded-2xl px-4 py-2.5 max-w-[85%] text-sm shadow-sm ${
                                    msg.sender === 'user' 
                                        ? 'bg-primary text-primary-foreground' 
                                        : msg.isError ? 'bg-destructive/10 text-destructive border border-destructive/20' : 'bg-white border border-border/50'
                                }`}>
                                    {msg.isError && <AlertCircle className="h-4 w-4 mb-1 inline mr-2" />}
                                    {msg.text && <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>}
                                    {msg.analysis && <BotResponse analysis={msg.analysis} />}
                                </div>
                            </div>
                        ))}
                         {isLoading && (
                            <div className="flex items-start gap-3">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-primary/20 shadow-sm">
                                    <Bot className="h-4 w-4 text-primary" />
                                </div>
                                <div className="rounded-2xl px-4 py-2.5 bg-white border border-border/50 shadow-sm">
                                    <Loader className="h-4 w-4 animate-spin text-muted-foreground" />
                                </div>
                            </div>
                        )}
                    </div>

                    <CardFooter className="border-t p-4 bg-background flex flex-col gap-4">
                        <div className="w-full space-y-4">
                            <div className="space-y-3">
                                <div className="space-y-2">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-1">Skin Type</p>
                                    <div className="flex flex-wrap gap-2">
                                        {SKIN_TYPES.map(type => (
                                            <button
                                                key={type}
                                                onClick={() => setSelectedSkinType(selectedSkinType === type ? null : type)}
                                                className={cn(
                                                    "px-3 py-1 rounded-full text-xs transition-all border",
                                                    selectedSkinType === type 
                                                        ? "bg-primary border-primary text-primary-foreground shadow-sm" 
                                                        : "bg-secondary/50 border-transparent hover:border-primary/30"
                                                )}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-1">Concerns</p>
                                    <div className="flex flex-wrap gap-2">
                                        {SKIN_CONCERNS.map(concern => (
                                            <button
                                                key={concern}
                                                onClick={() => toggleConcern(concern)}
                                                className={cn(
                                                    "px-3 py-1 rounded-full text-xs transition-all border",
                                                    selectedConcerns.includes(concern) 
                                                        ? "bg-accent border-accent text-accent-foreground shadow-sm" 
                                                        : "bg-secondary/50 border-transparent hover:border-accent/30"
                                                )}
                                            >
                                                {concern}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                {imageUri && (
                                    <div className="relative w-20 h-20 rounded-lg overflow-hidden border shadow-sm group">
                                        <Image src={imageUri} alt="Preview" fill className="object-cover" />
                                        <button 
                                            className="absolute top-1 right-1 h-5 w-5 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors" 
                                            onClick={() => setImageUri(null)}
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <Input
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                                        placeholder="Add any other details..."
                                        className="flex-1 bg-secondary/30 border-none focus-visible:ring-1 h-11"
                                        disabled={isLoading}
                                    />
                                    <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                                    <Button 
                                        variant="outline" 
                                        size="icon" 
                                        className="rounded-full shrink-0 h-11 w-11" 
                                        onClick={() => fileInputRef.current?.click()} 
                                        disabled={isLoading}
                                    >
                                        <Camera className="h-5 w-5" />
                                    </Button>
                                    <Button 
                                        onClick={handleSendMessage} 
                                        className="rounded-full shrink-0 h-11 w-11"
                                        disabled={isLoading || (!input.trim() && !imageUri && !selectedSkinType && selectedConcerns.length === 0)}
                                    >
                                        <Send className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <p className="text-[9px] text-center text-muted-foreground w-full">
                           For medical conditions, please see a dermatologist.
                        </p>
                    </CardFooter>
                </DialogContent>
            </Dialog>

            <Button
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl hover:scale-105 transition-transform"
                onClick={() => setIsOpen(true)}
            >
                <Sparkles className="h-6 w-6" />
                <span className="sr-only">Open Assistant</span>
            </Button>
        </>
    );
}


function BotResponse({ analysis }: { analysis: SkincareAssistantOutput }) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedProducts, setSelectedProducts] = useState<string[]>(analysis.recommendations.map(r => r.productName));
  const products = getProductsByNames(selectedProducts);
  const total = products.reduce((sum, p) => sum + p.price, 0);

  const handleAddToCart = () => {
    const productsToAdd = getProductsByNames(selectedProducts);
    productsToAdd.forEach(p => addToCart(p, 1));
    toast({
      title: "Routine Added",
      description: `${selectedProducts.length} items added to your cart.`
    })
  };

  const handleProductSelection = (productName: string) => {
    setSelectedProducts(prev => 
        prev.includes(productName) 
            ? prev.filter(p => p !== productName) 
            : [...prev, productName]
    );
  };
  
  return (
    <div className="space-y-5 py-2">
      <div className="space-y-1">
        <h3 className="font-bold text-base flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            Skin Analysis
        </h3>
        <p className="text-sm leading-relaxed opacity-90">{analysis.analysis}</p>
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-xs uppercase tracking-widest text-muted-foreground px-1">Recommended Rituals</h3>
        <div className="space-y-2.5">
          {analysis.recommendations.map((rec) => (
            <div key={rec.productName} className="flex items-start gap-3 bg-secondary/20 p-3 rounded-2xl border border-border/30">
                <input 
                    type="checkbox"
                    id={`chat-${rec.productName}`}
                    checked={selectedProducts.includes(rec.productName)}
                    onChange={() => handleProductSelection(rec.productName)}
                    className='mt-1 h-4 w-4 rounded-full accent-primary cursor-pointer'
                />
                <label htmlFor={`chat-${rec.productName}`} className="text-sm cursor-pointer leading-snug">
                    <span className="font-bold block mb-0.5">{rec.productName}</span>
                    <span className="text-muted-foreground text-xs">{rec.reason}</span>
                </label>
            </div>
          ))}
        </div>
      </div>
      
       <div className="bg-primary/10 p-4 rounded-2xl border border-primary/20 space-y-3">
        <div className="flex justify-between items-center px-1">
            <span className="text-xs font-semibold uppercase tracking-wide">Ready for Glow?</span>
            <span className="text-sm font-bold">₹{total.toLocaleString('en-IN')}</span>
        </div>
        <Button onClick={handleAddToCart} size="sm" className="w-full h-10 rounded-xl font-semibold shadow-sm" disabled={selectedProducts.length === 0}>
          Add {selectedProducts.length} to Cart
        </Button>
       </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {analysis.morningRoutine.length > 0 && (
            <div className="space-y-2 bg-white/50 p-4 rounded-2xl border border-border/50">
                <div className="flex items-center gap-2 mb-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <h4 className="font-bold text-[10px] uppercase tracking-wider text-primary">Morning</h4>
                </div>
                <ol className="space-y-1.5 text-xs list-decimal list-inside">
                    {analysis.morningRoutine.map((step, i) => <li key={`morning-${i}`} className="text-muted-foreground">{step}</li>)}
                </ol>
            </div>
        )}

        {analysis.nightRoutine.length > 0 && (
            <div className="space-y-2 bg-white/50 p-4 rounded-2xl border border-border/50">
                <div className="flex items-center gap-2 mb-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <h4 className="font-bold text-[10px] uppercase tracking-wider text-accent">Night</h4>
                </div>
                <ol className="space-y-1.5 text-xs list-decimal list-inside">
                    {analysis.nightRoutine.map((step, i) => <li key={`night-${i}`} className="text-muted-foreground">{step}</li>)}
                </ol>
            </div>
        )}
      </div>
    </div>
  );
}
