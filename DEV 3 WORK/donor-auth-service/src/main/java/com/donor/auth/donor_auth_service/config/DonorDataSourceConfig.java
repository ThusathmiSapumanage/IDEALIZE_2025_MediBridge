package com.donor.auth.donor_auth_service.config;

import  org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import jakarta.persistence.EntityManagerFactory;
import javax.sql.DataSource;

@Configuration
@EnableJpaRepositories(
        basePackages = "com.donor.auth.donor_auth_service.repository",
        entityManagerFactoryRef = "donorEntityManagerFactory",
        transactionManagerRef = "donorTransactionManager"
)
public class DonorDataSourceConfig {

    @Bean
    @Primary
    @ConfigurationProperties(prefix = "spring.datasource.donor")
    public DataSource donorDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean
    @Primary
    public LocalContainerEntityManagerFactoryBean donorEntityManagerFactory(
            EntityManagerFactoryBuilder builder,
            @Qualifier("donorDataSource") DataSource dataSource) {
        return builder
                .dataSource(dataSource)
                .packages("com.donor.auth.donor_auth_service.entity")
                .persistenceUnit("donor")
                .build();
    }

    @Bean
    public JpaTransactionManager donorTransactionManager(
            @Qualifier("donorEntityManagerFactory") EntityManagerFactory entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory);
    }
}
