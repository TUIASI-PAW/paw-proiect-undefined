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
        long count = -1;
        if (abonamentFiltersModel.getFilter() == null) {
            pagedResult = abonamentRepository.findAllByIsActive(true, paging);
            count = abonamentRepository.countByIsActive(true);
        } else {
            pagedResult = abonamentRepository.findByCategoryAndIsActive(abonamentFiltersModel.getFilter(), true, paging);
            count = abonamentRepository.countByCategoryAndIsActive(abonamentFiltersModel.getFilter(), true);
        }
        return new PaginationModel(pagedResult.getContent(), count);
    }

}
