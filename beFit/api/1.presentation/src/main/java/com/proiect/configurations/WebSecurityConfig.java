package com.proiect.configurations;

import com.proiect.entities.Role;
import com.proiect.security.JwtTokenFilterConfigurer;
import com.proiect.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                        .allowCredentials(false).maxAge(3600);
            }
        };
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                .antMatchers("/h2-console/**/**").permitAll()

                //AbonamentController Routes
                .antMatchers(HttpMethod.GET, "/api/abonament/").hasAuthority(Role.ROLE_ADMIN.getAuthority())
                .antMatchers(HttpMethod.POST, "/api/abonament/").hasAuthority(Role.ROLE_ADMIN.getAuthority())
                .antMatchers(HttpMethod.GET, "/api/abonament/{id:[0-9]+}").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/abonament/{id:[0-9]+}").hasAuthority(Role.ROLE_ADMIN.getAuthority())
                .antMatchers(HttpMethod.PATCH, "/api/abonament/{id:[0-9]+}/activate").hasAuthority(Role.ROLE_ADMIN.getAuthority())
                .antMatchers(HttpMethod.PATCH, "/api/abonament/{id:[0-9]+}/deactivate").hasAuthority(Role.ROLE_ADMIN.getAuthority())

                //AbonamentFiltersController Routes
                .antMatchers("/api/abonament/filters/pagination").permitAll()

                //UserController Routes
                .antMatchers(HttpMethod.GET, "/api/user/{id:[0-9]+}").authenticated()
                .antMatchers(HttpMethod.PATCH, "/api/user/{id:[0-9]+}").authenticated()
                .antMatchers(HttpMethod.PATCH, "/api/user/{id:[0-9]+}/balance").hasAuthority(Role.ROLE_CLIENT.getAuthority())
                .antMatchers(HttpMethod.DELETE, "/api/user/{id:[0-9]+}").hasAuthority(Role.ROLE_ADMIN.getAuthority())
                .antMatchers(HttpMethod.OPTIONS, "/api/user/{id:[0-9]+}/balance").permitAll()


                //UserAbonamentController Routes
                .antMatchers(HttpMethod.POST, "/api/user/{userId:[0-9]+}/abonament/{abId:[0-9]+}").hasAuthority(Role.ROLE_CLIENT.getAuthority())
                .antMatchers(HttpMethod.DELETE, "/api/user/{userId:[0-9]+}/abonament/{abId:[0-9]+}").denyAll()

                //AuthController Routes
                .antMatchers(HttpMethod.POST, "/api/auth/**").permitAll()

                //CategoryController Routes
                .antMatchers(HttpMethod.GET, "/api/category/").permitAll()

                .anyRequest().authenticated();

        http.apply(new JwtTokenFilterConfigurer(jwtTokenProvider));
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/v2/api-docs")//
                .antMatchers("/swagger-resources/**")//
                .antMatchers("/swagger-ui.html")//
                .antMatchers("/configuration/**")//
                .antMatchers("/webjars/**")//
                .antMatchers("/public")
                .and()
                .ignoring()
                .antMatchers("/h2-console/**/**");
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }


}
