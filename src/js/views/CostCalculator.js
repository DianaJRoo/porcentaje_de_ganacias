import React, { useState } from 'react';
import { create, all } from 'mathjs';

const math = create(all);

const CostCalculator = () => {
  // Estados para ingredientes de salsa
  const [salsaIngredients, setSalsaIngredients] = useState([{ name: '', cost: '', quantity: '' }]);
  const [totalSalsaVolume, setTotalSalsaVolume] = useState(''); // Volumen total de la salsa (en litros)
  const [numContainers, setNumContainers] = useState(''); // Cantidad de potes
  const [containerCost, setContainerCost] = useState(''); // Costo por pote
  const [totalSalsaCost, setTotalSalsaCost] = useState(0); // Costo total de salsa
  const [costPerContainer, setCostPerContainer] = useState(0); // Costo por pote de salsa

  // Función para calcular el costo total de los ingredientes de la salsa
  const calculateSalsaCost = () => {
    const totalCost = salsaIngredients.reduce((acc, ingredient) => {
      return acc + (parseFloat(ingredient.cost) || 0);
    }, 0);

    setTotalSalsaCost(totalCost);

    // Calcular el costo total de salsa por pote
    const totalVolume = parseFloat(totalSalsaVolume) || 1; // Volumen total de salsa (en litros)
    const containers = parseFloat(numContainers) || 1; // Cantidad de potes
    const totalContainerCost = (parseFloat(containerCost) || 0) * containers; // Costo total de los potes

    // Costo por pote de salsa (ingredientes + envases)
    const totalCostPerContainer = math.divide(totalCost + totalContainerCost, containers);
    setCostPerContainer(totalCostPerContainer);
  };

  // Función para agregar un nuevo ingrediente
  const addIngredient = () => {
    setSalsaIngredients(prev => [...prev, { name: '', cost: '', quantity: '' }]);
  };

  // Función para manejar cambios en los campos de los ingredientes
  const handleIngredientChange = (index, field, value) => {
    setSalsaIngredients(prev => {
      const updatedIngredients = [...prev];
      updatedIngredients[index][field] = value;
      return updatedIngredients;
    });
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Calculador de Costos de Salsa por Pote</h1>

      {/* Sección de Salsa */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Ingredientes de la Salsa</h2>
        {salsaIngredients.map((ingredient, index) => (
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

        <div className="mt-4">
          {/* Campo para el volumen total de salsa en litros */}
          <input
            className="border p-2 rounded w-full"
            type="number"
            placeholder="Volumen total de la salsa (en litros)"
            value={totalSalsaVolume}
            onChange={(e) => setTotalSalsaVolume(e.target.value)}
          />

          {/* Campo para la cantidad de potecitos */}
          <input
            className="border p-2 rounded w-full mt-2"
            type="number"
            placeholder="Número de potecitos"
            value={numContainers}
            onChange={(e) => setNumContainers(e.target.value)}
          />

          {/* Campo para el costo por pote */}
          <input
            className="border p-2 rounded w-full mt-2"
            type="number"
            placeholder="Costo por pote"
            value={containerCost}
            onChange={(e) => setContainerCost(e.target.value)}
          />

          {/* Botón para calcular el costo */}
          <button
            className="bg-black text-white p-2 rounded mt-2"
            onClick={calculateSalsaCost}
          >
            Calcular Costo Total por Pote
          </button>

          {/* Resultado */}
          <p className="mt-2 text-lg">Costo total de la salsa: {totalSalsaCost.toFixed(2)}</p>
          <p className="mt-2 text-lg">Costo por pote de salsa: {costPerContainer.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default CostCalculator;
