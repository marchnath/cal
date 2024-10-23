"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RiCalculatorFill } from "react-icons/ri";

export default function Calculator() {
  const [calculatorType, setCalculatorType] = useState("all-steps");
  const [lotVolume, setLotVolume] = useState("");
  const [steps, setSteps] = useState("");
  const [amount, setAmount] = useState("");
  const [coefficient, setCoefficient] = useState("");

  const [results, setResults] = useState([]);

  useEffect(() => {
    if (calculatorType === "crypto") {
      calculateCryptoResults();
    } else {
      calculateAllStepsResults();
    }
  }, [lotVolume, steps, amount, coefficient, calculatorType]);

  const calculateCryptoResults = () => {
    if (!lotVolume || !steps || !amount || !coefficient) return;

    const totalLotVolume = parseFloat(lotVolume);
    const numSteps = parseInt(steps);
    const totalAmount = parseFloat(amount);
    const coef = parseFloat(coefficient);

    if (
      isNaN(totalLotVolume) ||
      isNaN(numSteps) ||
      isNaN(totalAmount) ||
      isNaN(coef) ||
      numSteps <= 0 ||
      coef <= 1
    ) {
      return;
    }

    let currentLotSize =
      totalLotVolume / ((Math.pow(coef, numSteps) - 1) / (coef - 1));
    let currentAmount =
      totalAmount / ((Math.pow(coef, numSteps) - 1) / (coef - 1));

    let calculatedResults = [];
    for (let i = 0; i < numSteps; i++) {
      calculatedResults.push({
        step: i + 1,
        lotSize: parseFloat(currentLotSize.toFixed(4)),
        amount: parseFloat(currentAmount.toFixed(2)),
      });
      currentLotSize *= coef;
      currentAmount *= coef;
    }
    setResults(calculatedResults);
  };

  const calculateAllStepsResults = () => {
    if (!amount || !steps || !coefficient) return;

    const totalAmount = parseFloat(amount);
    const numSteps = parseInt(steps);
    const mult = parseFloat(coefficient);

    if (
      isNaN(totalAmount) ||
      isNaN(numSteps) ||
      isNaN(mult) ||
      numSteps <= 0 ||
      mult <= 1
    ) {
      return;
    }

    let currentValue =
      totalAmount / ((Math.pow(mult, numSteps) - 1) / (mult - 1));
    let calculatedResults = [];

    for (let i = 0; i < numSteps; i++) {
      const value = parseFloat(currentValue.toFixed(2));
      const percentage = ((value / totalAmount) * 100).toFixed(2);
      calculatedResults.push({
        step: i + 1,
        amount: value,
        percentage: percentage,
      });
      currentValue *= mult;
    }
    setResults(calculatedResults);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <RiCalculatorFill className="text-4xl text-blue-500 mt-4 mb-6 lg:mb-12" />
      {/* <h1 className="text-2xl font-bold mb-6 text-center">Калькулятор</h1> */}
      <div className="lg:flex lg:gap-8 lg:items-start">
        <div className="w-full lg:w-[600px] mb-6 lg:mb-0 bg-white rounded-3xl shadow-lg p-6">
          <div className="mb-4">
            <Label htmlFor="calculator-type" className="text-stone-500">
              Тип калькулятора
            </Label>
            <Select
              value={calculatorType}
              onValueChange={(value) => {
                setCalculatorType(value);
                setResults([]);
              }}
            >
              <SelectTrigger id="calculator-type">
                <SelectValue placeholder="Выберите калькулятор" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-steps">Форекс</SelectItem>
                <SelectItem value="crypto">Крипто</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="amount" className="text-stone-500">
                Сумма
              </Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="например, 1000"
                className="text-lg" // Increased text size
              />
            </div>
            {calculatorType === "crypto" && ( // Only show lot volume for crypto
              <div>
                <Label htmlFor="lotVolume">Объем лота</Label>
                <Input
                  id="lotVolume"
                  type="number"
                  value={lotVolume}
                  onChange={(e) => setLotVolume(e.target.value)}
                  placeholder="например, 1000"
                  className="text-lg" // Increased text size
                />
              </div>
            )}
            <div>
              <Label htmlFor="steps" className="text-stone-500">
                Количество шагов
              </Label>
              <Input
                id="steps"
                type="number"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                placeholder="например, 7"
                className="text-lg" // Increased text size
              />
            </div>
            <div>
              <Label htmlFor="coefficient" className="text-stone-500">
                Коэффициент
              </Label>
              <Input
                id="coefficient"
                type="number"
                value={coefficient}
                onChange={(e) => setCoefficient(e.target.value)}
                placeholder="например, 2"
                className="text-lg" // Increased text size
              />
            </div>
          </div>
        </div>

        {results.length > 0 && (
          <div className="flex-1 bg-white rounded-3xl shadow-lg p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Шаг</TableHead>
                  {calculatorType === "crypto" ? (
                    <>
                      <TableHead>Размер лота</TableHead>
                      <TableHead>Сумма</TableHead>
                    </>
                  ) : (
                    <>
                      <TableHead>Сумма</TableHead>
                      <TableHead>Процент</TableHead>
                    </>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody className="text-lg">
                {results.map((result) => (
                  <TableRow key={result.step}>
                    <TableCell>{result.step}</TableCell>
                    {calculatorType === "crypto" ? (
                      <>
                        <TableCell>{result.lotSize}</TableCell>
                        <TableCell>${result.amount}</TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>${result.amount}</TableCell>
                        <TableCell>{result.percentage}%</TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
                <TableRow className="font-bold">
                  <TableCell>Итого:</TableCell>
                  {calculatorType === "crypto" ? (
                    <>
                      <TableCell>
                        {results
                          .reduce((sum, r) => sum + r.lotSize, 0)
                          .toFixed(4)}
                      </TableCell>
                      <TableCell>
                        $
                        {results
                          .reduce((sum, r) => sum + r.amount, 0)
                          .toFixed(2)}
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>
                        $
                        {results
                          .reduce((sum, r) => sum + r.amount, 0)
                          .toFixed(2)}
                      </TableCell>
                      <TableCell>100%</TableCell>
                    </>
                  )}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
