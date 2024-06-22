"use client";
import { useState } from "react";
import { useChat } from "ai/react";

export default function Chat() {
  const [temperature, setTemperature] = useState(0.5);

  const { messages, append, isLoading } = useChat({
    body: {
      temperature: temperature,
    },
  });

  const topics = [
    { name: "Work", value: "work" },
    { name: "People", value: "people" },
    { name: "Animals", value: "animals" },
    { name: "Food", value: "food" },
    { name: "Television", value: "television" },
    { name: "Family", value: "family" },
    { name: "Sports", value: "sports" },
  ];
  const tones = [
    { name: "Witty", value: "witty" },
    { name: "Sarcastic", value: "sarcastic" },
    { name: "Funny", value: "funny" },
    { name: "Silly", value: "silly" },
    { name: "Dark", value: "dark" },
    { name: "Goofy", value: "goofy" },
    { name: "Family", value: "family" },
    { name: "Sports", value: "sports" },
    { name: "Satirical", value: "satirical" },
    { name: "Anecdotal", value: "anecdotal" },
  ];
  const jokeTypes = [
    { name: "Knock-Knock", value: "knock_knock" },
    { name: "One-liners", value: "one_liners" },
    { name: "Puns", value: "puns" },
    { name: "Riddles", value: "riddles" },
    { name: "Dad Jokes", value: "dad_jokes" },
    { name: "Lightbulb Jokes", value: "lightbulb_jokes" },
    { name: "Yo Mama", value: "yo_mama" },
    { name: "Blonde Jokes", value: "blonde_jokes" },
    { name: "Anti-jokes", value: "anti_jokes" },
    { name: "Lawyer Jokes", value: "lawyer_jokes" },
    { name: "Doctor Jokes", value: "doctor_jokes" },
    { name: "Animal Jokes", value: "animal_jokes" },
    { name: "Tech Jokes", value: "tech_jokes" },
    { name: "School Jokes", value: "school_jokes" },
    { name: "Holiday Jokes", value: "holiday_jokes" },
  ];

  const handleTemperatureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTemperature(parseFloat(event.target.value));
  };

  const handleTemperatureInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value) && value >= 0 && value <= 5) {
      setTemperature(value);
    }
  };

  const [state, setState] = useState({
    tone: "funny",
    topic: "animals",
    joke: "puns", 
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleGenerateJoke = () => {
    console.log('Temperature before append:', temperature);
    append({
      role: "user",
      content: `Can you make a joke of this type ${state.joke} on this topic ${state.topic} with this ${state.tone} tone `,
    });
  };

  const evaluateJoke = (joke) => {
    append({
      role: "user",
      content: `Evaluate this joke: "${joke}". Provide feedback on its funniness, appropriateness, and offensiveness.`,
    });
  };

  const handleEvaluation = () => {
    const joke = messages[messages.length - 1]?.content;
    if (joke && !joke.startsWith("Evaluate")) {
      evaluateJoke(joke);
    }
  };

  return (
    <main className="mx-auto w-full p-24 flex flex-col">
      <div className="p4 m-4">
        <div className="flex flex-col items-center justify-center space-y-8 text-white">
          <div className="space-y-2">
            <h2 className="text-3xl text-center font-bold">AI Jokes APP</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Customize the story by selecting the genre and tone.
            </p>
          </div>
          <div className="flex justify-center space-x-4">
            {/* Topics */}
            <div className="topics space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-6 w-60 h-48">
              <h3 className="text-xl font-semibold">Topics</h3>
              <select className="text-black w-full" name="topic" value={state.topic} onChange={handleChange}>
                {topics.map(({ value, name }) => (
                  <option key={value} value={value}>
                    {name}
                  </option>
                ))}
              </select>
              <div className="text-white overflow-hidden">You have selected this option: {state.topic}</div>
            </div>
            {/* Tones */}
            <div className="tones space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-6 w-60 h-48">
              <h3 className="text-xl font-semibold">Tones</h3>
              <select className="text-black w-full" name="tone" value={state.tone} onChange={handleChange}>
                {tones.map(({ value, name }) => (
                  <option key={value} value={value}>
                    {name}
                  </option>
                ))}
              </select>
              <div className="text-white overflow-hidden">You have selected this option: {state.tone}</div>
            </div>
            {/* JokeTypes */}
            <div className="jokes space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-6 w-60 h-48">
              <h3 className="text-xl font-semibold">Jokes</h3>
              <select className="text-black w-full" name="joke" value={state.joke} onChange={handleChange}>
                {jokeTypes.map(({ value, name }) => (
                  <option key={value} value={value}>
                    {name}
                  </option>
                ))}
              </select>
              <div className="text-white overflow-hidden">You have selected this option: {state.joke}</div>
            </div>
          </div>
          {/* Temperature */}
          <div className="temperature space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-6 w-60">
            <h3 className="text-xl font-semibold">Temperature</h3>
            <input
              type="range"
              min="0"
              max="2"
              step="0.01"
              value={temperature}
              onChange={handleTemperatureChange}
              className="w-full"
            />
            <input
              type="number"
              min="0"
              max="2"
              step="0.01"
              value={temperature}
              onChange={handleTemperatureInputChange}
              className="text-black w-full"
            />
            <div className="text-white">Current temperature: {temperature.toFixed(2)}</div>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            disabled={isLoading || (!state.tone || !state.joke || !state.topic)}
            onClick={handleGenerateJoke}
          >
            Generate a joke
          </button>

          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            disabled={messages.length === 0 || messages[messages.length - 1]?.content.startsWith("Evaluate")}
            onClick={handleEvaluation}
          >
            Evaluate the joke
          </button>

          <div
            hidden={
              messages.length === 0 ||
              messages[messages.length - 1]?.content.startsWith("Generate")
            }
            className="bg-opacity-25 bg-gray-700 rounded-lg p-4"
          >
            {messages[messages.length - 1]?.content}
          </div>
        </div>
      </div>
    </main>
  );
}
