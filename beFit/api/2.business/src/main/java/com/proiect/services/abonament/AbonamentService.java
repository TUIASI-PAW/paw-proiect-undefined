package com.proiect.services.abonament;

import com.proiect.entities.Abonament;
import com.proiect.exceptions.AbonamentExceptions.AbonamentNotFoundException;
import com.proiect.repositories.IAbonamentRepository;
import com.proiect.services.models.abonament.AbonamentModel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.Calendar;
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
            return (List<Abonament>) abonamentRepository.findAllByOrderByIsActive();
        else throw new AbonamentNotFoundException("Nu s-a găsit nimic.");
    }

    @Override
    public Abonament findById(int id) {
        if(abonamentRepository.findById(id).isPresent())
            return abonamentRepository.findById(id).get();
        else throw new AbonamentNotFoundException("Abonamentul nu există.");
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
            if(abonamentModel.getImage()!=null)
                abonament.setImage(abonamentModel.getImage());
            abonament.setDescription(abonamentModel.getDescription());

            abonamentRepository.save(abonament);
            return abonament;
        }
        else {
            throw new AbonamentNotFoundException("Abonamentul nu există.");
        }
    }

    @Override
    public void delete(int id) {
        var ab = findById(id);
        abonamentRepository.delete(ab);
    }

    @Override
    public void activate(int id) {
        var ab = findById(id);
        ab.setActive(true);
        ab.setDeletionDate(null);
        abonamentRepository.save(ab);
    }

    @Override
    public void deactivate(int id) {
        var ab = findById(id);
        ab.setActive(false);

        var calendar = java.util.Calendar.getInstance();
        calendar.setTime(new java.util.Date());
        calendar.add(Calendar.DATE, ab.getValability()+1);

        ab.setDeletionDate(new Date(calendar.getTimeInMillis()));
        abonamentRepository.save(ab);
    }

    @Override
    public Iterable<Abonament> findAllByIsActive(Boolean isActive){
        return abonamentRepository.findAllByIsActive(isActive);
    }
}
