package com.proiect.services.models.pagination;

import com.proiect.entities.Abonament;

import java.util.List;

public class PaginationModel {
    List<Abonament> abonamentList;
    long dbAbsCount;

    public PaginationModel(List<Abonament> abonamentList, long dbAbsCount) {
        this.abonamentList = abonamentList;
        this.dbAbsCount = dbAbsCount;
    }

    public PaginationModel() {
    }

    public List<Abonament> getAbonamentList() {
        return abonamentList;
    }

    public void setAbonamentList(List<Abonament> abonamentList) {
        this.abonamentList = abonamentList;
    }

    public long getDbAbsCount() {
        return dbAbsCount;
    }

    public void setDbAbsCount(long dbAbsCount) {
        this.dbAbsCount = dbAbsCount;
    }
}
