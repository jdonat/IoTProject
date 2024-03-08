package com.jux.coffreapi.Controller;

import com.jux.coffreapi.Model.Coffre;
import com.jux.coffreapi.Service.AlgoCesarServiceInterface;
import com.jux.coffreapi.Service.CoffreService;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.Objects;
import java.util.Optional;

@RestController

public class CoffreController extends Thread implements AlgoCesarServiceInterface{

    @Autowired
    PasswordEncoder passwordEncoder;
    private final RestTemplate restTemplate;

    // private final String raspberryBaseUrl = "http://192.168.90.214:8082";
    private final String raspberryBaseUrl = "http://localhost:8082";
    @Autowired
    private CoffreService coffreService;

    public CoffreController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }


    @RolesAllowed("ADMIN")
    @PutMapping("/admin/coffre")
    public ResponseEntity<String> changeCodeString(@RequestParam("oldCode") String oldCode,
                                                   @RequestParam("newCode") String newCode) {
        Optional<Coffre> oldCoffre = coffreService.getCoffre(1);
        System.out.println(oldCode + "  " + newCode);
        if (oldCoffre.isPresent()) {

            String oldDecCode = caesarCryptoDecode(oldCode, 7);
            String newDecCode = caesarCryptoDecode(newCode, 7);
            System.out.println(oldDecCode + "  " + newDecCode);

            if (Objects.equals(oldDecCode, caesarCryptoDecode(oldCoffre.get().getCode(), 9))) {
                Coffre newCoffre = oldCoffre.get();
                newCoffre.setCode(caesarCryptoEncode(newDecCode, 9));
                coffreService.saveCoffre(newCoffre);
                return ResponseEntity.ok("code modifié avec succès");
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("un incident est survenu lors de la mise à jour du code");
    }

    @RolesAllowed("ADMIN")
    @GetMapping("admin/coffre/1")
    public String getCoffre() {
        Optional<Coffre> coffre = coffreService.getCoffre(1);

        return "le code du coffre est : " + caesarCryptoEncode(caesarCryptoDecode(coffre.get().getCode(), 9), 15);
    }



    @PostMapping("/coffreopen")

    public ResponseEntity<String> openCoffre(@RequestParam String code) throws InterruptedException {
        Coffre coffre = coffreService.getCoffre(1).get();
        System.out.println(code);
        String decCode = caesarCryptoDecode(code, 15);
        System.out.println(decCode);

        if (Objects.equals(decCode, caesarCryptoDecode(coffre.getCode(), 9))) {
            coffre.setClosed(false);
            coffreService.saveCoffre(coffre);
            System.out.println("déverrouillé");
            String url = raspberryBaseUrl + "/open/led";
            restTemplate.getForObject(url, String.class);

            return ResponseEntity.ok("coffre ouvert !");
        } else {
            Thread.sleep(2000);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Ouverture du coffre impossible");
        }
    }

    @PostMapping("/coffreclose")

    public ResponseEntity<String> closeCoffre(@RequestParam String code) throws InterruptedException {
        Coffre coffre = coffreService.getCoffre(1).get();
        System.out.println(code);
        String decCode = caesarCryptoDecode(code, 15);
        System.out.println(decCode);
        if (Objects.equals(decCode, caesarCryptoDecode(coffre.getCode(), 9))) {
            coffre.setClosed(true);
            coffreService.saveCoffre(coffre);
            System.out.println("verrouillé");
            String url = raspberryBaseUrl + "/close/led";


            return ResponseEntity.ok(restTemplate.getForObject(url, String.class));
        } else {
            Thread.sleep(2000);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Ouverture du coffre impossible");

        }
    }


}