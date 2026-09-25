import { useState } from 'react';
import {
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

type Resultado = {
  carne: string;
  bebida: string;
  carneBase: string;
  bebidaBase: string;
  tipoDuracao: string;
};

export default function App() {
  const [adultos, setAdultos] = useState('');
  const [criancas, setCriancas] = useState('');
  const [horas, setHoras] = useState('');
  const [resultado, setResultado] = useState<Resultado | null>(null);

  const calcularChurrasco = () => {
    Keyboard.dismiss();

    const qtdAdultos = parseInt(adultos) || 0;
    const qtdCriancas = parseInt(criancas) || 0;
    const qtdHoras = parseFloat(horas) || 0;

    if (qtdAdultos === 0 && qtdCriancas === 0) {
      Alert.alert("Aviso ⚠", "Insira pelo menos um participante (adulto ou criança)!");
      return;
    }

    if (qtdHoras <= 0) {
      Alert.alert("Aviso ⚠", "Informe a duração da festa em horas!");
      return;
    }

    let carneAdultoKg = 0.40;
    let bebidaAdultoL = 1.20;
    let tipoDuracao = "Consumo Padrão (< 6 horas)";

    if (qtdHoras >= 6) {
      carneAdultoKg = 0.65;
      bebidaAdultoL = 2.00;
      tipoDuracao = "Consumo Estendido (≥ 6 horas)";
    }

    const totalCarneAdultos = qtdAdultos * carneAdultoKg;
    const totalCarneCriancas = qtdCriancas * (carneAdultoKg * 0.5);
    const totalCarneGeral = totalCarneAdultos + totalCarneCriancas;

    const totalBebidaAdultos = qtdAdultos * bebidaAdultoL;
    const totalBebidaCriancas = qtdCriancas * (bebidaAdultoL * 0.5);
    const totalBebidaGeral = totalBebidaAdultos + totalBebidaCriancas;

    setResultado({
      carne: totalCarneGeral.toFixed(2),
      bebida: totalBebidaGeral.toFixed(2),
      carneBase: (carneAdultoKg * 1000).toFixed(0),
      bebidaBase: (bebidaAdultoL * 1000).toFixed(0),
      tipoDuracao: tipoDuracao
    });
  };

  const recomecar = () => {
    setAdultos('');
    setCriancas('');
    setHoras('');
    setResultado(null);
    Keyboard.dismiss();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>🥩 Calculadora de Churrasco 🍻</Text>
      <Text style={styles.subtitulo}>Planeje sua festa sem faltar nada!</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>👥 Total de Adultos:</Text>
        <TextInput 
          style={styles.input}
          placeholder="Ex: 5"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={adultos}
          onChangeText={setAdultos}
        />

        <Text style={styles.label}>🧒 Total de Crianças:</Text>
        <TextInput 
          style={styles.input}
          placeholder="Ex: 2"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={criancas}
          onChangeText={setCriancas}
        />

        <Text style={styles.label}>⏱ Duração da Festa (Horas):</Text>
        <TextInput 
          style={styles.input}
          placeholder="Ex: 5"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={horas}
          onChangeText={setHoras}
        />
      </View>

      <TouchableOpacity style={styles.botaoCalcular} onPress={calcularChurrasco}>
        <Text style={styles.textoBotao}>Calcular Consumo 📋</Text>
      </TouchableOpacity>

      {(adultos !== '' || criancas !== '' || horas !== '' || resultado !== null) && (
        <TouchableOpacity style={styles.botaoRecomecar} onPress={recomecar}>
          <Text style={styles.textoBotaoRecomecar}>Recomeçar 🔄</Text>
        </TouchableOpacity>
      )}

      {resultado !== null && (
        <View style={styles.resultadoContainer}>
          <Text style={styles.resultadoTitulo}>✨ Resultados do Churrasco ✨</Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>🥩 Total de Alimentos</Text>
            <Text style={styles.cardValue}>{resultado.carne} kg</Text>
            <Text style={styles.cardSub}>Cota base adulto: {resultado.carneBase}g</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>🥤 Total de Líquidos</Text>
            <Text style={styles.cardValue}>{resultado.bebida} Litros</Text>
            <Text style={styles.cardSub}>Cota base adulto: {resultado.bebidaBase}ml</Text>
          </View>

          <View style={styles.footerInfo}>
            <Text style={styles.footerText}>💡 {resultado.tipoDuracao}</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    paddingTop: 50,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  botaoCalcular: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoRecomecar: {
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  textoBotaoRecomecar: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  resultadoContainer: {
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    elevation: 2,
  },
  resultadoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#ecf0f1',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#34495e',
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#27ae60',
    marginVertical: 4,
  },
  cardSub: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  footerInfo: {
    marginTop: 5,
    padding: 8,
    backgroundColor: '#fff9c4',
    borderRadius: 5,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#f57f17',
    fontWeight: '500',
  },
});