import { useEffect, useRef, useState } from "react";

// Types
interface DomainOption {
  questionId: string;
  option: string;
}

interface DomainQuestion {
  id: string;
  text: string;
  options: string[];
}

interface DomainProbabilities {
  topDomain: "influencer" | "tech" | "military" | "gaming";
  probabilities: {
    influencer: number;
    tech: number;
    military: number;
    gaming: number;
  };
}

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface SpeakerQA {
  question: string;
  answer: string;
}

// Domain mapping configuration
const domainMapping: { [key: string]: string } = {
  "Technology & Innovation": "tech",
  "Personal Growth & Motivation": "influencer",
  "Business & Entrepreneurship": "gaming",
  "Environment & Sustainability": "military",
  "Art, Culture & Storytelling": "influencer",
  "Emotional and inspiring": "influencer",
  "Practical and solution-focused": "tech",
  "Thought-provoking and analytical": "military",
  "Entertaining with stories": "gaming",
  "Energized and motivated": "influencer",
  "Calm and reflective": "military",
  "Curious and questioning": "tech",
  "Empowered to take action": "gaming",
  "Innovator, always exploring new ideas": "tech",
  "Dreamer, inspired by journeys and experiences": "influencer",
  "Problem-solver, looking for actionable insights": "military",
  "Visionary, interested in big-picture thinking": "gaming",
  "Challenge your perspective": "military",
  "Share a personal journey": "influencer",
  "Offer new tools or skills": "tech",
  "Highlight global challenges and solutions": "gaming",
};

// Domain questions data
const domainQuestions: DomainQuestion[] = [
  {
    id: "q1",
    text: "Which area excites you the most?",
    options: [
      "Technology & Innovation",
      "Personal Growth & Motivation",
      "Business & Entrepreneurship",
      "Environment & Sustainability",
      "Art, Culture & Storytelling",
    ],
  },
  {
    id: "q2",
    text: "What kind of experience do you prefer?",
    options: [
      "Emotional and inspiring",
      "Practical and solution-focused",
      "Thought-provoking and analytical",
      "Entertaining with stories",
    ],
  },
  {
    id: "q3",
    text: "How do you want to feel after the talk?",
    options: [
      "Energized and motivated",
      "Calm and reflective",
      "Curious and questioning",
      "Empowered to take action",
    ],
  },
  {
    id: "q4",
    text: "Which setting sounds most like you?",
    options: [
      "Innovator, always exploring new ideas",
      "Dreamer, inspired by journeys and experiences",
      "Problem-solver, looking for actionable insights",
      "Visionary, interested in big-picture thinking",
    ],
  },
  {
    id: "q5",
    text: "Do you enjoy talks that…",
    options: [
      "Challenge your perspective",
      "Share a personal journey",
      "Offer new tools or skills",
      "Highlight global challenges and solutions",
    ],
  },
];

// Domain descriptions
const domainDescriptions = {
  influencer: {
    name: "Influencer & Storytelling",
    description: "Focus on personal growth, motivation, and inspiring content",
    color: "purple",
  },
  tech: {
    name: "Technology & Innovation",
    description:
      "Emphasis on practical solutions, tools, and technical innovation",
    color: "blue",
  },
  military: {
    name: "Strategic Leadership",
    description: "Analytical thinking, problem-solving, and strategic planning",
    color: "green",
  },
  gaming: {
    name: "Visionary & Gaming",
    description: "Big-picture thinking, entertainment, and strategic vision",
    color: "orange",
  },
};

// Utility functions
const getDomainFromOption = (option: string): string => {
  return domainMapping[option] || "unknown";
};

const getDomainInfo = (domain: string) => {
  return (
    domainDescriptions[domain as keyof typeof domainDescriptions] || {
      name: domain,
      description: "Unknown domain",
      color: "gray",
    }
  );
};

const calculateWeightedDomainProbability = (
  selectedOptions: DomainOption[]
): DomainProbabilities => {
  const domainWeights = {
    influencer: 0,
    tech: 0,
    military: 0,
    gaming: 0,
  };

  const questionWeights: { [key: string]: number } = {
    q1: 1.2,
    q2: 1.0,
    q3: 1.1,
    q4: 1.3,
    q5: 1.0,
  };

  selectedOptions.forEach((option) => {
    const domain = getDomainFromOption(option.option);
    const weight = questionWeights[option.questionId] || 1.0;
    if (domain in domainWeights) {
      domainWeights[domain as keyof typeof domainWeights] += weight;
    }
  });

  const totalPossibleWeight = Object.values(questionWeights).reduce(
    (sum, weight) => sum + weight,
    0
  );

  const probabilities = {
    influencer: (domainWeights.influencer / totalPossibleWeight) * 100,
    tech: (domainWeights.tech / totalPossibleWeight) * 100,
    military: (domainWeights.military / totalPossibleWeight) * 100,
    gaming: (domainWeights.gaming / totalPossibleWeight) * 100,
  };

  type ProbKey = keyof typeof probabilities;

  const topDomain = (Object.keys(probabilities) as ProbKey[]).reduce(
    (max, domain) => (probabilities[domain] > probabilities[max] ? domain : max),
    "influencer" as ProbKey
  );

  return {
    topDomain,
    probabilities,
  };
};

// React Component with TypeScript
const ChatbotSection: React.FC = () => {
  const [showChatbot, setShowChatbot] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<DomainOption[]>([]);
  const [domainProbabilities, setDomainProbabilities] =
    useState<DomainProbabilities | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const speakerQA: SpeakerQA[] = [
    {
      question: "What types of speakers do you have?",
      answer:
        "We have experts in technology, business, personal development, and more!",
    },
    {
      question: "How can I book a speaker?",
      answer: "You can book through our website or contact our team directly.",
    },
    {
      question: "What topics do your speakers cover?",
      answer:
        "Our speakers cover innovation, leadership, marketing, and emerging trends.",
    },
  ];

  const handleOptionSelect = (questionId: string, option: string): void => {
    setSelectedOptions((prev:any) => {
      const filtered = prev.filter((opt:any) => opt.questionId !== questionId);
      return [...filtered, { questionId, option }];
    });
  };

  const handleSpeakerQuestionClick = (qa: SpeakerQA): void => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: qa.question,
      isBot: false,
      timestamp: new Date(),
    };

    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: qa.answer,
      isBot: true,
      timestamp: new Date(),
    };

    setChatMessages((prev:any) => [...prev, userMessage, botMessage]);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  return (
    <>
      {showChatbot && (
        <section className="relative py-12 px-4 sm:px-6">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float"
                style={{
                  left: `${20 + i * 10}%`,
                  top: `${30 + i * 8}%`,
                  animationDelay: `${i * 1.2}s`,
                  animationDuration: `${4 + Math.random() * 2}s`,
                }}
              >
                <div className="w-3 h-3 bg-red-500/20 rounded-full blur-sm"></div>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto relative">
            <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-red-500/40 rounded-2xl shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-transparent to-red-500/20 animate-pulse rounded-2xl"></div>

              <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-red-800 p-4 rounded-t-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-red-600/30 animate-gradient-x"></div>
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 shadow-lg">
                        <svg
                          className="w-8 h-8 text-red-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z"
                          />
                        </svg>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg tracking-wide">
                        Speaker Assistant
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-red-100 text-xs font-medium">
                          Find your perfect speaker match!
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowChatbot(false)}
                    className="text-red-100 hover:text-white transition-all duration-300 p-2 hover:bg-red-600/40 rounded-full hover:rotate-90 transform"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 h-[500px]">
                <div className="relative border-r-0 lg:border-r border-red-500/30 bg-gradient-to-b from-transparent via-gray-900/30 to-gray-900/60 flex flex-col min-h-0 border-b lg:border-b-0 border-red-500/30">
                  <div className="sticky top-0 bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-sm p-4 border-b border-red-500/20">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg">
                          Conversation
                        </h4>
                        <p className="text-red-200 text-xs">
                          Chat with our assistant
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    ref={chatContainerRef}
                    className="flex-1 p-4 overflow-y-auto overflow-x-hidden space-y-4 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-red-500 min-h-0"
                  >
                    {chatMessages.map((message, index) => (
                      <div
                        key={message.id}
                        className={`flex items-start gap-4 animate-message-slide ${
                          message.isBot ? "justify-start" : "justify-end"
                        }`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {message.isBot && (
                          <>
                            <div className="relative">
                              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 shadow-lg">
                                <svg
                                  className="w-6 h-6 text-red-600"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z"
                                  />
                                </svg>
                              </div>
                              <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping opacity-30"></div>
                            </div>
                            <div className="max-w-xs px-5 py-3 rounded-2xl bg-gradient-to-br from-red-600/30 to-red-700/20 text-white border border-red-500/40 shadow-lg backdrop-blur-sm hover:shadow-red-500/20 transition-all duration-300 break-words">
                              <p className="text-sm leading-relaxed">
                                {message.text}
                              </p>
                              <span className="text-xs text-red-300 mt-2 block font-medium">
                                {message.timestamp.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                          </>
                        )}

                        {!message.isBot && (
                          <>
                            <div className="max-w-xs px-5 py-3 rounded-2xl bg-gradient-to-br from-white to-gray-100 text-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 break-words">
                              <p className="text-sm leading-relaxed font-medium">
                                {message.text}
                              </p>
                              <span className="text-xs text-gray-500 mt-2 block font-medium">
                                {message.timestamp.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                            <div className="relative">
                              <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center shadow-lg">
                                <svg
                                  className="w-6 h-6 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                              </div>
                              <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping opacity-30"></div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                <div className="relative bg-gradient-to-br from-gray-900/60 via-black/80 to-gray-900/60 overflow-hidden flex flex-col min-h-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-red-500/5"></div>

                  <div className="sticky top-0 bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-sm p-4 border-b border-red-500/20">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg">
                          Find Your Domain
                        </h4>
                        <p className="text-red-200 text-xs">
                          Select your preferences
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 p-4 overflow-hidden min-h-0">
                    <div className="h-full space-y-6 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-red-500 pr-2 min-h-0">
                      <div className="relative">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-red-200 text-sm font-medium">
                            Progress: {selectedOptions.length}/5
                          </span>
                          <span className="text-red-200 text-sm font-medium">
                            {Math.round((selectedOptions.length / 5) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-700/50 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-500"
                            style={{
                              width: `${(selectedOptions.length / 5) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      {domainQuestions.map((question, index) => (
                        <div
                          key={question.id}
                          className="relative group animate-slide-up"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="bg-gradient-to-r from-gray-800/60 to-gray-800/40 border border-gray-700/50 rounded-xl p-4 transition-all duration-300 hover:border-red-500/40">
                            <h3 className="text-white font-semibold mb-3 text-sm flex items-center gap-2">
                              <span className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-xs">
                                {index + 1}
                              </span>
                              {question.text}
                            </h3>

                            <div className="space-y-2">
                              {question.options.map((option, optionIndex) => {
                                const isSelected = selectedOptions.some(
                                  (opt) =>
                                    opt.questionId === question.id &&
                                    opt.option === option
                                );
                                const domain = getDomainFromOption(option);
                                const domainInfo = getDomainInfo(domain);

                                return (
                                  <button
                                    key={optionIndex}
                                    onClick={() =>
                                      handleOptionSelect(question.id, option)
                                    }
                                    className={`w-full text-left p-3 rounded-lg transition-all duration-300 border ${
                                      isSelected
                                        ? `bg-${domainInfo.color}-600/30 border-${domainInfo.color}-500/60 text-white shadow-lg`
                                        : "bg-gray-700/30 border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:border-red-500/40"
                                    } hover:scale-[1.02] group relative overflow-hidden break-words`}
                                  >
                                    {isSelected && (
                                      <div
                                        className={`absolute top-2 right-2 w-4 h-4 bg-${domainInfo.color}-500 rounded-full flex items-center justify-center`}
                                      >
                                        <svg
                                          className="w-3 h-3 text-white"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={3}
                                            d="M5 13l4 4L19 7"
                                          />
                                        </svg>
                                      </div>
                                    )}

                                    <div className="flex items-center gap-3">
                                      <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                          isSelected
                                            ? `bg-${domainInfo.color}-500 text-white`
                                            : "bg-gray-600 text-gray-400 group-hover:bg-red-500/20 group-hover:text-red-300"
                                        } transition-all duration-300`}
                                      >
                                        {String.fromCharCode(65 + optionIndex)}
                                      </div>

                                      <div className="flex-1 min-w-0">
                                        <span className="text-sm font-medium block">
                                          {option}
                                        </span>
                                        <div
                                          className={`text-xs mt-1 ${
                                            isSelected
                                              ? "text-gray-300"
                                              : "text-gray-500 group-hover:text-red-200"
                                          } transition-colors duration-300`}
                                        >
                                          Domain: {domainInfo.name}
                                        </div>
                                      </div>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      ))}

                      {selectedOptions.length === 5 && (
                        <div className="relative animate-slide-up">
                          <button
                            onClick={() =>
                              setDomainProbabilities(
                                calculateWeightedDomainProbability(
                                  selectedOptions
                                )
                              )
                            }
                            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-500/30 border border-red-500/50 group relative overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                            <div className="relative flex items-center justify-center gap-3">
                              <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                              </svg>
                              <span className="text-lg">
                                Discover Your Domain
                              </span>
                            </div>
                          </button>

                          {domainProbabilities && (
                            <div className="mt-4 bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-red-500/30 rounded-xl p-4 backdrop-blur-sm">
                              <h4 className="text-white font-semibold mb-3 text-center">
                                Your Domain Analysis
                              </h4>

                              <div className="text-center mb-4">
                                <div
                                  className={`inline-flex items-center gap-2 bg-${
                                    getDomainInfo(domainProbabilities.topDomain)
                                      .color
                                  }-600/20 border border-${
                                    getDomainInfo(domainProbabilities.topDomain)
                                      .color
                                  }-500/40 rounded-full px-4 py-2`}
                                >
                                  <span className="text-gray-300 text-sm">
                                    Recommended Domain:
                                  </span>
                                  <span className="text-white font-bold text-lg">
                                    {
                                      getDomainInfo(
                                        domainProbabilities.topDomain
                                      ).name
                                    }
                                  </span>
                                </div>
                                <div className="text-gray-300 text-xs mt-2">
                                  {
                                    getDomainInfo(domainProbabilities.topDomain)
                                      .description
                                  }
                                </div>
                                <div className="text-red-200 text-xs mt-1">
                                  Match:{" "}
                                  {Math.round(
                                    domainProbabilities.probabilities[
                                      domainProbabilities.topDomain
                                    ]
                                  )}
                                  %
                                </div>
                              </div>

                              <div className="space-y-3">
                                {Object.entries(
                                  domainProbabilities.probabilities
                                ).map(([domain, probability]) => (
                                  <div
                                    key={domain}
                                    className="flex items-center justify-between"
                                  >
                                    <span className="text-gray-300 text-sm">
                                      {getDomainInfo(domain).name}
                                    </span>
                                    <div className="flex items-center gap-3">
                                      <div className="w-24 bg-gray-700 rounded-full h-2">
                                        <div
                                          className={`h-2 rounded-full bg-${
                                            getDomainInfo(domain).color
                                          }-500 transition-all duration-1000`}
                                          style={{ width: `${probability}%` }}
                                        ></div>
                                      </div>
                                      <span className="text-white text-sm font-medium w-8 text-right">
                                        {Math.round(probability)}%
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ChatbotSection;
