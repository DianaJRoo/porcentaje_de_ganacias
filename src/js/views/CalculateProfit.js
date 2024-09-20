import React, { useState } from 'react';
import { create, all } from 'mathjs';

const math = create(all);

const ProfitCalculator = () => {
  const [tequenoTrayCost, setTequenoTrayCost] = useState(''); // Costo de la bandeja de tequeños
  const [salsaCost, setSalsaCost] = useState(''); // Costo de la salsa
  const [salePrice, setSalePrice] = useState(''); // Precio de venta
  const [totalCost, setTotalCost] = useState(0); // Costo total (tequeños + salsa)
  const [profit, setProfit] = useState(0); // Ganancia en dinero
  const [profitPercentage, setProfitPercentage] = useState(0); // Porcentaje de ganancia

  // Función para calcular la ganancia y el porcentaje
  const calculateProfit = () => {
    const tequenoCost = parseFloat(tequenoTrayCost) || 0;
    const salsaCostCalc = parseFloat(salsaCost) || 0;
    const totalProductCost = tequenoCost + salsaCostCalc; // Suma del costo total

    setTotalCost(totalProductCost);

    const sale = parseFloat(salePrice) || 0;

    // Ganancia en términos absolutos
    const profitCalc = sale - totalProductCost;
    setProfit(profitCalc);

    // Porcentaje de ganancia
    const profitPercentageCalc = sale ? (profitCalc / sale) * 100 : 0;
    setProfitPercentage(profitPercentageCalc);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Calculador de Ganancias por Bandeja de Tequeños + Salsa</h1>

      {/* Costo de la bandeja de tequeños */}
      <div className="mb-4">
        <label className="block text-lg mb-2">Costo de la bandeja de tequeños</label>
        <input
          className="border p-2 rounded w-full"
          type="number"
          placeholder="Ingresa el costo de la bandeja de tequeños"
          value={tequenoTrayCost}
          onChange={(e) => setTequenoTrayCost(e.target.value)}
        />
      </div>

      {/* Costo de la salsa */}
      <div className="mb-4">
        <label className="block text-lg mb-2">Costo de la salsa</label>
        <input
          className="border p-2 rounded w-full"
          type="number"
          placeholder="Ingresa el costo de la salsa"
          value={salsaCost}
          onChange={(e) => setSalsaCost(e.target.value)}
        />
      </div>

      {/* Precio de venta */}
      <div className="mb-4">
        <label className="block text-lg mb-2">Precio de venta del conjunto (bandeja + salsa)</label>
        <input
          className="border p-2 rounded w-full"
          type="number"
          placeholder="Ingresa el precio de venta"
          value={salePrice}
          onChange={(e) => setSalePrice(e.target.value)}
        />
      </div>

      {/* Botón para calcular la ganancia */}
      <button
        className="bg-green-500 text-white p-2 rounded"
        onClick={calculateProfit}
      >
        Calcular Ganancia
      </button>

      {/* Resultados */}
      <div className="mt-4">
        <p className="text-lg">Costo total del conjunto (tequeños + salsa): {totalCost.toFixed(2)}</p>
        <p className="text-lg">Ganancia: {profit.toFixed(2)}</p>
        <p className="text-lg">Porcentaje de ganancia: {profitPercentage.toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default ProfitCalculator;
