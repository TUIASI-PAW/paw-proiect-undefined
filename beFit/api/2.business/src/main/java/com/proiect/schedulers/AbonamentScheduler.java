package com.proiect.schedulers;

import com.proiect.services.abonament.IAbonamentService;
import com.proiect.services.user.IUserAbonamentService;
import com.proiect.services.user.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@EnableAsync
@EnableScheduling
@Configuration
public class AbonamentScheduler {

    @Autowired
    private final IUserService userService;

    @Autowired
    private final IUserAbonamentService userAbonamentService;

    @Autowired
    private final IAbonamentService abonamentService;

    public AbonamentScheduler(IUserService userService, IUserAbonamentService userAbonamentService, IAbonamentService abonamentService) {
        this.userService = userService;
        this.userAbonamentService = userAbonamentService;
        this.abonamentService = abonamentService;
    }

    @Async
    @Scheduled(fixedRate = 1000 * 60 * 60)//once per hour
    public void processUserAbonamentExpirationDate() {
        for (var user : userService.findAll())
            if (!user.getAbonamente().isEmpty())
                for (var uab : user.getAbonamente())
                    if (uab.getExpirationDate().compareTo(new java.util.Date()) < 0)
                        userAbonamentService.remove(uab.getId().getUserId(), uab.getId().getAbonamentId());
    }

    @Async
    @Scheduled(fixedRate = 1000 * 60 * 60 * 24)// once at 24hrs
    public void processAbonamentExpirationDate() {
        for (var ab : abonamentService.findAllByIsActive(false))
            if (ab.getDeletionDate().compareTo(new java.util.Date()) < 0)
                abonamentService.delete(ab.getId());
    }
}
