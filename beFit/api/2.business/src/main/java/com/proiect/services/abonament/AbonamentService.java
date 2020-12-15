package com.proiect.services.abonament;

import com.proiect.entities.Abonament;
import com.proiect.exceptions.AbonamentExceptions.AbonamentCategoryNotFoundException;
import com.proiect.exceptions.AbonamentExceptions.AbonamentNotFoundException;
import com.proiect.repositories.IAbonamentRepository;
import com.proiect.services.models.abonament.AbonamentModel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AbonamentService implements IAbonamentService {
    @Autowired
    private final IAbonamentRepository abonamentRepository;

    @Autowired
    private final ModelMapper modelMapper;

    public AbonamentService(IAbonamentRepository abonamentRepository, ModelMapper modelMapper) {
        this.abonamentRepository = abonamentRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<Abonament> listAll() {
        if(abonamentRepository.count() > 0)
            return (List<Abonament>) abonamentRepository.findAll();
        else throw new AbonamentNotFoundException("No record found.");
    }

    @Override
    public Abonament findById(int id) {
        if(abonamentRepository.findById(id).isPresent())
            return abonamentRepository.findById(id).get();
        else throw new AbonamentNotFoundException("Abonament does not exists.");
    }

    @Override
    public List<Abonament> findByCategory(String category) {
        if(abonamentRepository.findByCategory(category).isEmpty())
            throw new AbonamentCategoryNotFoundException("Category does not exists.");
        return abonamentRepository.findByCategory(category);
    }

    @Override
    public Abonament insert(AbonamentModel abonamentModel) {
        var abonament = modelMapper.map(abonamentModel, Abonament.class);
        return abonamentRepository.save(abonament);
    }

    @Override
    public Abonament update(int id, AbonamentModel abonamentModel) {
        if(abonamentRepository.findById(id).isPresent()) {
            Abonament abonament = abonamentRepository.findById(id).get();

            abonament.setTitle(abonamentModel.getTitle());
            abonament.setCategory(abonamentModel.getCategory());
            abonament.setValability(abonamentModel.getValability());
            abonament.setExpirationDate(abonamentModel.getExpirationDate());
            abonament.setPrice(abonamentModel.getPrice());
            abonament.setImage(abonamentModel.getImage());
            abonament.setDescription(abonamentModel.getDescription());

            abonamentRepository.save(abonament);
            return abonament;
        }
        else {
            throw new AbonamentNotFoundException("Abonament Id not found.");
        }
    }

    @Override
    public void delete(int id) {
        if(abonamentRepository.findById(id).isPresent()) {
            abonamentRepository.deleteById(id);
        }
        else {
            throw new AbonamentNotFoundException("Abonament Id not found.");
        }
    }

}
