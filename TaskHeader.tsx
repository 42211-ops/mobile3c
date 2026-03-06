/**
 * Componente de cabeçalho principal
 * Exibe título e descrição da apicação
 */

import { Text, View, StyleSheet } from "react-native";
import { colors, spacing, typography } from "../styles/theme";

function TaskHeader() {
    return (
        <View style={StyleSheet.taskHeader}>
            <Text style={StyleSheet.textHeader}>Lista de Tarefas</Text>
            <Text style={styles.textSubtitle}>
                Organize suas atividades de forma simples
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    taskHeader: {
        backgroundColor: colors.primary,
    }
})