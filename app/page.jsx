"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Calculator() {
  const [amount, setAmount] = useState("");
  const [steps, setSteps] = useState("");
  const [multiplier, setMultiplier] = useState("");
  const [results, setResults] = useState([]);

  const calculate = () => {
    const totalAmount = parseFloat(amount);
    const numSteps = parseInt(steps);
    const mult = parseFloat(multiplier);

    if (
      isNaN(totalAmount) ||
      isNaN(numSteps) ||
      isNaN(mult) ||
      numSteps <= 0 ||
      mult <= 1
    ) {
      alert(
        "Please enter valid numbers. Amount and Steps should be positive, and Multiplier should be greater than 1."
      );
      return;
    }

    let currentValue =
      totalAmount / ((Math.pow(mult, numSteps) - 1) / (mult - 1));
    let calculatedResults = [];

    for (let i = 0; i < numSteps; i++) {
      calculatedResults.push(parseFloat(currentValue.toFixed(2)));
      currentValue *= mult;
    }

    setResults(calculatedResults);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Calculator</h1>

      <div className="mb-4">
        <Label htmlFor="calculator-type">Calculator Type</Label>
        <Select defaultValue="all-steps">
          <SelectTrigger id="calculator-type">
            <SelectValue placeholder="Select a calculator" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-steps">All Steps</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="amount">Amount ($)</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g., 1000"
          />
        </div>

        <div>
          <Label htmlFor="steps">Number of Steps</Label>
          <Input
            id="steps"
            type="number"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            placeholder="e.g., 7"
          />
        </div>

        <div>
          <Label htmlFor="multiplier">Multiplier</Label>
          <Input
            id="multiplier"
            type="number"
            value={multiplier}
            onChange={(e) => setMultiplier(e.target.value)}
            placeholder="e.g., 2"
          />
        </div>

        <Button onClick={calculate} className="w-full">
          Calculate
        </Button>
      </div>

      {results.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Results:</h2>
          <ul className="list-decimal pl-5">
            {results.map((result, index) => (
              <li key={index} className="mb-1">
                Step {index + 1}: ${result.toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="mt-2 font-semibold">
            Total: ${results.reduce((sum, num) => sum + num, 0).toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}
