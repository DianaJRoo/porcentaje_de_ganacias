import React, { useState } from 'react';
import { create, all } from 'mathjs';

const math = create(all);

const TequenoCostCalculator = () => {
  // Estados para los ingredientes de los tequeños
  const [tequenoIngredients, setTequenoIngredients] = useState([{ name: '', cost: '', quantity: '' }]);
  const [tequenosPerBatch, setTequenosPerBatch] = useState(''); // Cantidad de tequeños por lote (ej. por kg)
  const [numTequenosPerTray, setNumTequenosPerTray] = useState(''); // Cantidad de tequeños por bandeja
  const [trayUnitCost, setTrayUnitCost] = useState(''); // Costo de cada bandeja
  const [numTraysUsed, setNumTraysUsed] = useState(''); // Cantidad de bandejas usadas
  const [labelUnitCost, setLabelUnitCost] = useState(''); // Costo de cada etiqueta
  const [numLabelsUsed, setNumLabelsUsed] = useState(''); // Cantidad de etiquetas usadas
  const [totalTequenoCost, setTotalTequenoCost] = useState(0); // Costo total de los tequeños
  const [costPerTequeno, setCostPerTequeno] = useState(0); // Costo por tequeño
  const [costPerTray, setCostPerTray] = useState(0); // Costo total por bandeja

  // Función para calcular el costo total de los tequeños
  const calculateTequenoCost = () => {
    // Calcular el costo total de los ingredientes de los tequeños
    const totalIngredientCost = tequenoIngredients.reduce((acc, ingredient) => {
      return acc + (parseFloat(ingredient.cost) || 0);
    }, 0);

    setTotalTequenoCost(totalIngredientCost);

    // Calcular el costo por tequeño
    const tequenos = parseFloat(tequenosPerBatch) || 1; // Cantidad total de tequeños que se pueden hacer
    const costPerTequenoCalc = math.divide(totalIngredientCost, tequenos);
    setCostPerTequeno(costPerTequenoCalc);

    // Calcular el costo total de bandejas y etiquetas
    const traysUsed = parseFloat(numTraysUsed) || 1;
    const totalTrayCost = math.multiply(parseFloat(trayUnitCost) || 0, traysUsed); // Costo total de bandejas

    const labelsUsed = parseFloat(numLabelsUsed) || 1;
    const totalLabelCost = math.multiply(parseFloat(labelUnitCost) || 0, labelsUsed); // Costo total de etiquetas

    // Calcular el costo por bandeja
    const tequenosInTray = parseFloat(numTequenosPerTray) || 1; // Cantidad de tequeños por bandeja
    const totalCostPerTray = math.multiply(costPerTequenoCalc, tequenosInTray) + totalTrayCost + totalLabelCost;
    setCostPerTray(totalCostPerTray);
  };

  // Función para agregar un nuevo ingrediente
  const addIngredient = () => {
    setTequenoIngredients(prev => [...prev, { name: '', cost: '', quantity: '' }]);
  };

  // Función para manejar cambios en los campos de los ingredientes
  const handleIngredientChange = (index, field, value) => {
    setTequenoIngredients(prev => {
      const updatedIngredients = [...prev];
      updatedIngredients[index][field] = value;
      return updatedIngredients;
    });
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Calculador de Costos de Tequeños por Bandeja</h1>

      {/* Sección de Ingredientes */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Ingredientes de los Tequeños</h2>
        {tequenoIngredients.map((ingredient, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <input
              className="border p-2 rounded w-1/3"
              type="text"
              placeholder="Ingrediente"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
            />
            <input
              className="border p-2 rounded w-1/3"
              type="number"
              placeholder="Costo"
              value={ingredient.cost}
              onChange={(e) => handleIngredientChange(index, 'cost', e.target.value)}
            />
          </div>
        ))}
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={addIngredient}
        >
          Agregar Ingrediente
        </button>

        {/* Campos adicionales para el cálculo */}
        <div className="mt-4">
          <input
            className="border p-2 rounded w-full"
            type="number"
            placeholder="Cantidad de tequeños por lote (ej. por kg)"
            value={tequenosPerBatch}
            onChange={(e) => setTequenosPerBatch(e.target.value)}
          />

          <input
            className="border p-2 rounded w-full mt-2"
            type="number"
            placeholder="Cantidad de tequeños por bandeja"
            value={numTequenosPerTray}
            onChange={(e) => setNumTequenosPerTray(e.target.value)}
          />

          <input
            className="border p-2 rounded w-full mt-2"
            type="number"
            placeholder="Costo por unidad de bandeja"
            value={trayUnitCost}
            onChange={(e) => setTrayUnitCost(e.target.value)}
          />

          <input
            className="border p-2 rounded w-full mt-2"
            type="number"
            placeholder="Cantidad de bandejas usadas"
            value={numTraysUsed}
            onChange={(e) => setNumTraysUsed(e.target.value)}
          />

          <input
            className="border p-2 rounded w-full mt-2"
            type="number"
            placeholder="Costo por unidad de etiqueta"
            value={labelUnitCost}
            onChange={(e) => setLabelUnitCost(e.target.value)}
          />

          <input
            className="border p-2 rounded w-full mt-2"
            type="number"
            placeholder="Cantidad de etiquetas usadas"
            value={numLabelsUsed}
            onChange={(e) => setNumLabelsUsed(e.target.value)}
          />

          {/* Botón para calcular el costo */}
          <button
            className="bg-green-500 text-white p-2 rounded mt-2"
            onClick={calculateTequenoCost}
          >
            Calcular Costo Total por Bandeja
          </button>

          {/* Resultado */}
          <p className="mt-2 text-lg">Costo total de los ingredientes de tequeños: {totalTequenoCost.toFixed(2)}</p>
          <p className="mt-2 text-lg">Costo por tequeño: {costPerTequeno.toFixed(2)}</p>
          <p className="mt-2 text-lg">Costo total por bandeja (incluyendo bandejas y etiquetas): {costPerTray.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default TequenoCostCalculator;



