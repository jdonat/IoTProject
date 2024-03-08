package com.jux.coffreapi.Service;

import com.jux.coffreapi.Model.Contenu;
import com.jux.coffreapi.Repository.ContenuRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Data
@Service
public class ContenuService {

    @Autowired
    private ContenuRepository contenuRepository ;


    public Contenu storeImage(int contenuId, MultipartFile file) throws IOException {
        Contenu contenu = contenuRepository.findById(contenuId)
                .orElseThrow(() -> new RuntimeException("Contenu non trouvé pour cet id :: " + contenuId));

        contenu.setImageData(file.getBytes());

        return contenuRepository.save(contenu);
    }
    public Iterable<Contenu> getContenus(){
        return contenuRepository.findAll();
    }

    public Optional<Contenu> getContenu(final int id){
        return contenuRepository.findById(id);
    }


    public Contenu saveContenu (Contenu contenu){
        return contenuRepository.save(contenu);
    }

    public void deleteContenu (int id){

        contenuRepository.deleteById(id);
}
}
