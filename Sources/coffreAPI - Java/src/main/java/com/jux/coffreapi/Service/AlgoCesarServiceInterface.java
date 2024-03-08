package com.jux.coffreapi.Service;

import org.springframework.stereotype.Service;

@Service

public interface AlgoCesarServiceInterface {

    default String caesarCryptoEncode(String text, int shift) {
        if (text == null || text.trim().isEmpty()) {
            return "";
        }

        StringBuilder resultat = new StringBuilder();
        for (char character : text.toCharArray()) {
            if (Character.isLetter(character)) {
                shift = shift % 26;
                char base = Character.isUpperCase(character) ? 'A' : 'a';
                int newCharacter = (((character + shift) - base + 26) % 26) + base;
                resultat.append((char) newCharacter);
            } else if (Character.isDigit(character)) {
                shift = shift % 10;
                char base = 48;
                int newCharacter = (((character + shift) - base + 10) % 10) + base;
                resultat.append((char) newCharacter);
            } else {
                resultat.append(character);
            }
        }
        return resultat.toString();
    }
    default String caesarCryptoDecode(String text, int shift) {
        return caesarCryptoEncode(text, -shift);
    }

}
