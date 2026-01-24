'use client';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Sparkles, MessageSquare, X, Camera, Send, User, Bot, Loader, KeyRound } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { skincareAssistant, SkincareAssistantOutput } from '@/ai/flows/skincare-assistant';
import Image from 'next/image';
import { getProductsByNames } from '@/lib/products';
import AddToCartButton from '../cart/AddToCartButton';
import { useCart } from '@/hooks/use-cart';

type Message = {
    sender: 'user' | 'bot';
    text?: string;
    analysis?: SkincareAssistantOutput;
};

const API_KEY_STORAGE_KEY = 'natura_api_key';

export default function AiChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const [imageUri, setImageUri] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();
    const [isApiKeyModalOpen, setApiKeyModalOpen] = useState(false);
    const [apiKey, setApiKey] = useState('');
    const [tempApiKey, setTempApiKey] = useState('');


    useEffect(() => {
        const storedApiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
        if (storedApiKey) {
            setApiKey(storedApiKey);
        }
    }, []);

    useEffect(() => {
        if(isOpen) {
            if (!apiKey) {
                setMessages([{
                    sender: 'bot',
                    text: "Hello! To use the Skincare Assistant, please provide your API key."
                }]);
            } else {
                 setMessages([{
                    sender: 'bot',
                    text: "Hello! I'm your personal skincare assistant. To get started, please describe your skin concerns. You can also upload or take a photo for a more accurate analysis."
                }]);
            }
        }
    }, [isOpen, apiKey]);
    
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({video: true});
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings.',
        });
      }
    };

    const handleCameraOpen = () => {
        if (hasCameraPermission === null) {
            getCameraPermission();
        }
    }

    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
                context.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);
                const dataUri = canvasRef.current.toDataURL('image/jpeg');
                setImageUri(dataUri);

                // Stop camera stream
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
                setHasCameraPermission(null);
            }
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageUri(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSendMessage = async () => {
        if ((!input.trim() && !imageUri) || !apiKey) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);
        setInput('');

        try {
            const result = await skincareAssistant({
                apiKey: apiKey,
                userMessage: input,
                photoDataUri: imageUri ?? undefined
            });
            setMessages(prev => [...prev, { sender: 'bot', analysis: result }]);
            setImageUri(null); // Clear image after sending
        } catch (error) {
            console.error("AI assistant error:", error);
            const errorMessage = (error as Error).message.includes('Invalid API Key')
                ? "Your API Key is invalid. Please update it."
                : "I'm sorry, I encountered an error. Please try again.";

            setMessages(prev => [...prev, { sender: 'bot', text: errorMessage }]);
            toast({
                variant: 'destructive',
                title: 'AI Assistant Error',
                description: (error as Error).message.includes('Invalid API Key')
                    ? 'Could not authenticate. Please check your API key.'
                    : 'Could not get recommendations at this time.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveApiKey = () => {
        setApiKey(tempApiKey);
        localStorage.setItem(API_KEY_STORAGE_KEY, tempApiKey);
        setApiKeyModalOpen(false);
        toast({
            title: 'API Key Saved',
            description: 'Your API key has been securely stored in your browser.',
        });
    };
    
    return (
        <>
             <Dialog open={isApiKeyModalOpen} onOpenChange={setApiKeyModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Enter API Key</DialogTitle>
                    <DialogDescription>
                        Please enter your API key to use the AI Skincare Assistant. Your key is stored locally in your browser and is not shared.
                    </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Input
                            id="apiKey"
                            placeholder="Your API Key"
                            value={tempApiKey}
                            onChange={(e) => setTempApiKey(e.target.value)}
                            type="password"
                        />
                    </div>
                    <CardFooter>
                        <Button onClick={handleSaveApiKey} className='w-full'>Save API Key</Button>
                    </CardFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="h-[80vh] max-w-2xl flex flex-col p-0">
                    <DialogHeader className="flex flex-row items-start justify-between border-b p-4">
                         <div className="space-y-1.5">
                             <DialogTitle className="flex items-center gap-2 text-lg">
                                <Sparkles className="h-6 w-6 text-primary" />
                                <span>Skincare Assistant</span>
                            </DialogTitle>
                            <DialogDescription className="pl-8">
                                Chat with our AI for personalized recommendations.
                            </DialogDescription>
                         </div>
                         <Button variant="ghost" size="icon" onClick={() => setApiKeyModalOpen(true)}>
                            <KeyRound className="h-5 w-5" />
                            <span className="sr-only">Set API Key</span>
                         </Button>
                    </DialogHeader>
                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                                {msg.sender === 'bot' && <Bot className="h-6 w-6 text-primary flex-shrink-0" />}
                                <div className={`rounded-lg p-3 max-w-[80%] ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                                    {msg.text && <p className="text-sm">{msg.text}</p>}
                                    {msg.analysis && <BotResponse analysis={msg.analysis} />}
                                </div>
                                 {msg.sender === 'user' && <User className="h-6 w-6 text-muted-foreground flex-shrink-0" />}
                            </div>
                        ))}
                         {isLoading && (
                            <div className="flex items-start gap-3">
                                <Bot className="h-6 w-6 text-primary flex-shrink-0" />
                                <div className="rounded-lg p-3 bg-secondary">
                                    <Loader className="h-5 w-5 animate-spin" />
                                </div>
                            </div>
                        )}

                    </CardContent>
                    <CardFooter className="border-t p-4">
                        <div className='w-full space-y-2'>
                        {imageUri && (
                            <div className="relative w-24 h-24 rounded-md overflow-hidden">
                                <Image src={imageUri} alt="Selected" fill className="object-cover" />
                                <Button variant="ghost" size="icon" className="absolute top-0 right-0 h-6 w-6 bg-black/50 hover:bg-black/70 text-white" onClick={() => setImageUri(null)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder={!apiKey ? "Please set your API key..." : "Describe your skin concerns..."}
                                disabled={isLoading || !apiKey}
                            />
                            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                            <Button variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()} disabled={isLoading || !apiKey}>
                                <Camera className="h-5 w-5" />
                            </Button>
                            <Button onClick={handleSendMessage} disabled={isLoading || !apiKey}>
                                <Send className="h-5 w-5" />
                            </Button>
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                           Your image is used only for skin analysis and is not stored.
                        </div>
                        </div>
                    </CardFooter>
                </DialogContent>
            </Dialog>

            <Button
                className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg"
                onClick={() => setIsOpen(true)}
            >
                <MessageSquare className="h-6 w-6" />
                <span className="sr-only">Open Skincare Assistant</span>
            </Button>
             <canvas ref={canvasRef} className="hidden"></canvas>
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
      title: "Products Added",
      description: `${selectedProducts.length} products have been added to your cart.`
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
    <div className="space-y-4">
      <div>
        <h3 className="font-bold">Skin Analysis</h3>
        <p className="text-sm">{analysis.analysis}</p>
      </div>

      <div>
        <h3 className="font-bold">Recommended Products</h3>
        <div className="space-y-3 mt-2">
          {analysis.recommendations.map((rec) => (
            <div key={rec.productName} className="flex items-start gap-2">
                <input 
                    type="checkbox"
                    id={rec.productName}
                    checked={selectedProducts.includes(rec.productName)}
                    onChange={() => handleProductSelection(rec.productName)}
                    className='mt-1'
                />
                <label htmlFor={rec.productName} className="text-sm">
                    <span className="font-medium">{rec.productName}</span>: {rec.reason}
                </label>
            </div>
          ))}
        </div>
      </div>
      
       <div className="bg-background/50 p-3 rounded-md">
        <h4 className="font-bold">Add to Cart</h4>
        {selectedProducts.length > 0 ? (
          <div className="mt-2 space-y-2">
            <div className="text-sm font-medium flex justify-between">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
            </div>
            <Button onClick={handleAddToCart} size="sm" className="w-full">
              Add {selectedProducts.length} item(s) to cart
            </Button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground mt-1">Select products to add them to your cart.</p>
        )}
       </div>


      {analysis.morningRoutine.length > 0 && (
        <div>
          <h3 className="font-bold">Morning Routine</h3>
          <ol className="list-decimal list-inside text-sm mt-1">
            {analysis.morningRoutine.map((step, i) => <li key={`morning-${i}`}>{step}</li>)}
          </ol>
        </div>
      )}

      {analysis.nightRoutine.length > 0 && (
        <div>
          <h3 className="font-bold">Night Routine</h3>
          <ol className="list-decimal list-inside text-sm mt-1">
            {analysis.nightRoutine.map((step, i) => <li key={`night-${i}`}>{step}</li>)}
          </ol>
        </div>
      )}
    </div>
  );
}
