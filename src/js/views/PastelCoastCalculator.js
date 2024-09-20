import React, { useState } from 'react';
import { create, all } from 'mathjs';

const math = create(all);

const PastelCostCalculator = () => {
  const [cakeIngredients, setCakeIngredients] = useState([{ name: '', cost: '' }]); // Ingredientes del pastel
  const [numCakeSlices, setNumCakeSlices] = useState(''); // Número de trozos por pastel
  const [trayUnitCost, setTrayUnitCost] = useState(''); // Costo por unidad de bandeja
  const [numTrays, setNumTrays] = useState(''); // Cantidad de bandejas usadas
  const [labelUnitCost, setLabelUnitCost] = useState(''); // Costo por unidad de etiqueta
  const [numLabels, setNumLabels] = useState(''); // Cantidad de etiquetas usadas
  const [costPerSlice, setCostPerSlice] = useState(0); // Costo total por trozo de pastel

  // Función para calcular el costo por trozo
  const calculateSliceCost = () => {
    // Calcular el costo total de los ingredientes del pastel
    const totalIngredientCost = cakeIngredients.reduce((acc, ingredient) => {
      return acc + (parseFloat(ingredient.cost) || 0);
    }, 0);

    // Calcular el costo de bandejas y etiquetas
    const totalTrayCost = (parseFloat(trayUnitCost) || 0) * (parseFloat(numTrays) || 0);
    const totalLabelCost = (parseFloat(labelUnitCost) || 0) * (parseFloat(numLabels) || 0);

    // Calcular el costo por trozo de pastel
    const slices = parseFloat(numCakeSlices) || 1;
    const costPerSliceCalc = math.divide(totalIngredientCost, slices);

    // Calcular el costo total por trozo, sumando ingredientes, bandeja y etiqueta
    const totalCostPerSlice = costPerSliceCalc + math.divide(totalTrayCost, slices) + math.divide(totalLabelCost, slices);

    setCostPerSlice(totalCostPerSlice);
  };

  // Función para agregar un nuevo ingrediente
  const addIngredient = () => {
    setCakeIngredients(prev => [...prev, { name: '', cost: '' }]);
  };

  // Función para manejar cambios en los campos de los ingredientes
  const handleIngredientChange = (index, field, value) => {
    setCakeIngredients(prev => {
      const updatedIngredients = [...prev];
      updatedIngredients[index][field] = value;
      return updatedIngredients;
    });
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Calculador de Costos para Realizar un Pastel</h1>

      {/* Sección de Ingredientes */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Ingredientes del Pastel</h2>
        {cakeIngredients.map((ingredient, index) => (
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
          className="bg-yellow-500 text-white p-2 rounded"
          onClick={addIngredient}
        >
          Agregar Ingrediente
        </button>

        {/* Campos adicionales para el cálculo */}
        <div className="mt-4">
          <input
            className="border p-2 rounded w-full"
            type="number"
            placeholder="Número de trozos por pastel"
            value={numCakeSlices}
            onChange={(e) => setNumCakeSlices(e.target.value)}
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
            value={numTrays}
            onChange={(e) => setNumTrays(e.target.value)}
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
            value={numLabels}
            onChange={(e) => setNumLabels(e.target.value)}
          />

          {/* Botón para calcular el costo */}
          <button
            className="bg-black text-white p-2 rounded mt-2 "
            onClick={calculateSliceCost}
          >
            Calcular Costo por Trozo
          </button>

          {/* Resultado */}
          <p className="mt-2 text-lg">Costo total por trozo de pastel (ingredientes + bandeja + etiqueta): {costPerSlice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default PastelCostCalculator;
