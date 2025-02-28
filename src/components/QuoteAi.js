import { useEffect, useState, useRef } from "react";
import AiLoader from "./AiLoader";
import { AIFormattedText } from "./AIFormattedText";
import logo from '../images/openAi.png';

const quotes = [
  "\"You don’t need a university degree to be a great developer. The internet is your campus, and every line of code you write is a lesson learned.\" \n\n - ChatGPT",
  "\"Formal education teaches theory, but the internet teaches you how to build. The best developers are those who learn by doing, not just by attending lectures.\" \n\n - ChatGPT",
  "\"Code doesn’t care where you learned it. Whether from a university or a YouTube tutorial, what matters is how well you can solve problems.\" \n\n - ChatGPT",
  "\"The greatest programmers weren’t made in classrooms; they were built through curiosity, persistence, and countless debugging sessions.\" \n\n - ChatGPT",
  "\"The internet gives you everything a degree does—except the debt. The real question is: Are you disciplined enough to use it?\" \n\n - ChatGPT",
  "\"A computer, an internet connection, and a drive to build—those are the only prerequisites to becoming a self-taught developer.\" \n\n - ChatGPT",
  "\"Skipping university doesn’t mean skipping education. Every Stack Overflow thread, GitHub repo, and online course is another step toward mastery.\" \n\n - ChatGPT",
  "\"Degrees open doors, but skills build new ones. The internet gives you access to the same knowledge as top universities—you just have to seek it.\" \n\n - ChatGPT",
  "\"In the world of software development, no one cares about where you learned—only what you’ve built. The internet is your university, and experience is your degree.\" \n\n - ChatGPT",
  "\"The best way to learn programming isn’t in a lecture hall—it’s through trial, error, and Google. The internet is the greatest professor of all time.\" \n\n - ChatGPT",
  "\"The best developers aren’t those with degrees, but those who never stop learning, experimenting, and building.\" \n\n - ChatGPT",
  "\"You don’t need permission to learn. The internet has made knowledge free—your only job is to take it.\" \n\n - ChatGPT",
  "\"Every great coder was once a beginner. The difference is that self-taught developers never stop being students.\" \n\n - ChatGPT",
  "\"A degree might get you an interview, but a portfolio of real-world projects will get you the job.\" \n\n - ChatGPT",
  "\"Self-taught developers don’t wait for teachers; they become their own.\" \n\n - ChatGPT",
  "\"The internet has replaced the classroom, and experience has replaced the diploma.\" \n\n - ChatGPT",
  "\"Your ability to learn, adapt, and solve problems will always be more valuable than a piece of paper from a university.\" \n\n - ChatGPT",
  "\"The only curriculum that matters is the one you create for yourself, based on what you need to build today.\" \n\n - ChatGPT",
  "\"Being self-taught isn’t about skipping education—it’s about redefining what education means.\" \n\n - ChatGPT",
  "\"The real test of a developer isn’t a degree—it’s debugging a problem with no clear solution.\" \n\n - ChatGPT",
  "\"The internet has democratized education. If you have WiFi and motivation, you can learn anything.\" \n\n - ChatGPT",
  "\"Programming isn’t about what you were taught—it’s about what you’ve built. The internet is your playground.\" \n\n - ChatGPT",
  "\"Self-taught developers are proof that knowledge isn’t confined to institutions—it belongs to those who seek it.\" \n\n - ChatGPT",
  "\"Your GitHub is your diploma, your portfolio is your degree, and your experience is your professor.\" \n\n - ChatGPT",
  "\"In programming, curiosity is more valuable than credentials. Keep asking, keep learning, keep building.\" \n\n - ChatGPT",
  "\"The best software engineers are those who learn beyond the classroom, who build beyond assignments, and who fail forward.\" \n\n - ChatGPT",
  "\"Success in software development is not about where you studied, but about what you create.\" \n\n - ChatGPT",
  "\"Degrees expire, but skills compound. A self-taught developer is always growing, always adapting.\" \n\n - ChatGPT",
  "\"A university degree might impress HR, but a working application will impress everyone else.\" \n\n - ChatGPT",
  "\"Self-taught means self-made. Your journey is proof that learning is limitless and entirely in your control.\" \n\n - ChatGPT"
];


const QuoteAi = () => {
  const [thinking, setThinking] = useState(1);
  const [quote, setQuote] = useState("Thinking...");
  const [usedQuotes, setUsedQuotes] = useState([]); // Track shown quotes
  const ref = useRef(null);
  const timeoutRef = useRef(null);
  const hasStartedRef = useRef(false); 

  useEffect(() => {
    const handleIntersection = ([entry]) => {
      if (entry.isIntersecting && !hasStartedRef.current) {
        hasStartedRef.current = true; 
        generateNewQuote();
      }
    };

    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.6 });

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const generateNewQuote = () => {
    setThinking(1);
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setThinking(2);
      let newQuote;
      let availableQuotes = quotes.filter(q => !usedQuotes.includes(q)); // Exclude used quotes

      if (availableQuotes.length === 0) {
        setUsedQuotes([]); // Reset when all quotes have been used
        availableQuotes = [...quotes]; // Start fresh
      }

      newQuote = availableQuotes[Math.floor(Math.random() * availableQuotes.length)];

      setUsedQuotes(prev => [...prev, newQuote]); // Add to used quotes list
      setQuote(newQuote);
    }, 3000);
  };


  return (
    <div ref={ref} className="relative w-[90%] max-w-[1500px] mx-auto text-center mt-[50px] bg-black">
        <div className="border border-[rgba(76,76,76,0.5)] rounded-lg ">
         <div className="border-b border-[rgba(76,76,76,0.5)] flex items-center px-5 py-3">
          <img src={logo} className="w-[30px] mr-4"/>
          <p className="text-[15px] text-white text-left">  
            {thinking === 1 ? "Thinking..." : thinking === 2 ? "Writing..." : "Done"}
          </p>
          <i class="bi bi-arrow-clockwise text-gray-600 ml-auto mr-0 hover:text-white" onClick={()=>generateNewQuote()}></i> 
         </div>
          <div className="w-[100%] h-[300px] flex flex-col  items-center justify-center">            
            <p className="text-white sm:text-[15px] md:text-[25px] font-bold"> Self Taught </p>
            <AIFormattedText text={quote} onComplete={() => setThinking(3)}/>
          </div>
        </div>
    </div>
  );
};

export default QuoteAi;
