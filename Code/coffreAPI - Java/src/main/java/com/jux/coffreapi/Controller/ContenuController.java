package com.jux.coffreapi.Controller;

import com.jux.coffreapi.Model.Contenu;
import com.jux.coffreapi.Service.ContenuService;
import com.jux.coffreapi.Service.ImageCompressorInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Optional;


@RestController
public class ContenuController implements ImageCompressorInterface {

    @Autowired
    private ContenuService contenuService;

    @GetMapping("/contenu/{id}")
    public Optional<Contenu> getContenu(@PathVariable("id") final int id) {
        return contenuService.getContenu(id);
    }

    @GetMapping("/contenus")
    public Iterable<Contenu> getContenus() {
        System.out.println("fetched by front");
        return contenuService.getContenus();
    }


    @PostMapping("/contenu")
    public Contenu createContenu(@RequestBody Contenu contenu) {

        return contenuService.saveContenu(contenu);
    }

    @PostMapping("/contenuimage")
    public ResponseEntity<String> createContenuWithImage(
            @RequestParam("description") String description,
            @RequestParam("imagedata") MultipartFile imagedata) {
        try {
            Contenu contenu = new Contenu();
            contenu.setDescription(description);
            if (!imagedata.isEmpty()) {
                byte[] compressedImageData = compressImage(imagedata);
                contenu.setImageData(compressedImageData);
            }
            contenuService.saveContenu(contenu);

            return ResponseEntity.ok("Contenu créé avec succès avec l'ID: " + contenu.getId());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur lors de la création du contenu: " + e.getMessage());
        }
    }

    @DeleteMapping("/contenu/delete/{id}")

    public String deleteContenu(@PathVariable("id") int id, Model model) {

        if (contenuService.getContenu(id).isEmpty()) return "contenu déjà supprimé";
        contenuService.deleteContenu(id);
        String message = "suppression effectuée !";

        model.addAttribute("message", message);
        return "success";
    }


    @PutMapping("/uploadimage/{id}")
    public ResponseEntity<String> uploadImageToContenu(@PathVariable int id, @RequestParam("imagedata") MultipartFile file) {
        try {
            Contenu contenu = contenuService.storeImage(id, file);
            return ResponseEntity.ok().body("Image ajoutée au contenu avec l'ID: " + contenu.getId());
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Erreur lors du stockage de l'image");
        }
    }

    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getContenuImage(@PathVariable int id) {
        Optional<Contenu> contenu = contenuService.getContenu(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + contenu.get().getDescription() + ".jpg"+ "\"")
                .body(contenu.get().getImageData());
    }
}

