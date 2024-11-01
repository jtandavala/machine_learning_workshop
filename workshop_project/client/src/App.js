import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("Não tem diabetes");

  // Estado para armazenar os valores de cada campo na tabela
  const [formValues, setFormValues] = useState({
    preg: 0,
    plas: 0,
    pres: 0,
    skin: 0,
    test: 0,
    mass: 0,
    pedi: 0,
    age: 0,
  });

  // Função para atualizar o estado dos valores de entrada
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Função para chamar a API e analisar os dados
  const handleAnalyze = async () => {
    setLoading(true);
    try {
      console.log(formValues);
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors",
        body: JSON.stringify(formValues),
      });
      const data = await response.json();
      setResult(data.resultado);
    } catch (error) {
      console.error("Erro ao chamar a API:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="header">
        <h2 className="mb-0 text-center">
          Análise preditiva do risco de diabetes em mulheres indianas Pima
        </h2>
      </div>

      <div
        className="profile-header"
        style={{
          backgroundImage:
            "url('https://iyfglobal.org/sites/default/files/2022-08/Women_post.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "350px",
          position: "relative",
        }}
      ></div>

      <div className="profile-content">
        <div className="profile-main">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Número de vezes que a paciente ficou grávida.</td>
                <td>
                  <input
                    type="number"
                    name="preg"
                    value={formValues.preg}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  Concentração de glicose no plasma a 2 horas em um teste de
                  tolerância à glicose.
                </td>
                <td>
                  <input
                    type="number"
                    name="plas"
                    value={formValues.plas}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </td>
              </tr>
              <tr>
                <td>Pressão arterial diastólica (mm Hg).</td>
                <td>
                  <input
                    type="number"
                    name="pres"
                    value={formValues.pres}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </td>
              </tr>
              <tr>
                <td>Espessura da dobra cutânea do tríceps (mm).</td>
                <td>
                  <input
                    type="number"
                    name="skin"
                    value={formValues.skin}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </td>
              </tr>
              <tr>
                <td>Nível de insulina sérica (mu U/ml).</td>
                <td>
                  <input
                    type="number"
                    name="test"
                    value={formValues.test}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </td>
              </tr>
              <tr>
                <td>Índice de massa corporal (peso em kg/(altura em m²)).</td>
                <td>
                  <input
                    type="number"
                    name="mass"
                    value={formValues.mass}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </td>
              </tr>
              <tr>
                <td>Função de pedigree do diabetes (histórico familiar).</td>
                <td>
                  <input
                    type="number"
                    name="pedi"
                    value={formValues.pedi}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </td>
              </tr>
              <tr>
                <td>Idade da paciente.</td>
                <td>
                  <input
                    type="number"
                    name="age"
                    value={formValues.age}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="p-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAnalyze}
              disabled={loading}
            >
              {loading ? "Analisando..." : "Analisar"}
            </button>
          </div>
        </div>

        <div className="profile-sidebar px-4">
          <h4>RESULTADO</h4>
          <div className="alert alert-success text-center" role="alert">
            <h1>{result}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
