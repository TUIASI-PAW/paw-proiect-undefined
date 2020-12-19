package com.proiect.services.abonament;

import com.proiect.entities.Abonament;
import com.proiect.repositories.IAbonamentRepository;
import com.proiect.services.models.abonament.AbonamentFiltersModel;
import com.proiect.services.models.pagination.PaginationModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class AbonamentFiltersService implements IAbonamentFiltersService {

    @Autowired
    private final IAbonamentRepository abonamentRepository;

    public AbonamentFiltersService(IAbonamentRepository abonamentRepository) {
        this.abonamentRepository = abonamentRepository;
    }

    @Override
    public PaginationModel getAllAbs(AbonamentFiltersModel abonamentFiltersModel) {
        Pageable paging = PageRequest.of(abonamentFiltersModel.getPageNo(), abonamentFiltersModel.getPageSize(), Sort.by(abonamentFiltersModel.getSortBy()).ascending());
        Page<Abonament> pagedResult;

        if(abonamentFiltersModel.getFilter() == null) {
            pagedResult = abonamentRepository.findAll(paging);
        } else {
            pagedResult = abonamentRepository.findByCategory(abonamentFiltersModel.getFilter(), paging);
        }

        if(pagedResult.hasContent()) {
            return new PaginationModel(pagedResult.getContent(), abonamentRepository.count());
        } else {
            return new PaginationModel(null, -1);
        }
    }

}
