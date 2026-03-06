/**
 * Componente de rodapé
 * Exibe informações adicionais no fim da aplicação
 */

import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, typography } from '../style/theme';

function TaskFooter(){
    return (
        <View style={StyleSheet.TaskFooter}>
            <Text Style={styles.text}>
                Feito para oerganizar tarefas 
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    TaskFooter: {
        padding: spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
    },
});