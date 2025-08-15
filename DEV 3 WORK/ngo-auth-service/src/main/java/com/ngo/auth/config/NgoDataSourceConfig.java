package com.ngo.auth.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import jakarta.persistence.EntityManagerFactory;
import javax.sql.DataSource;

@Configuration
@EnableJpaRepositories(
        basePackages = "com.ngo.auth.repository",
        entityManagerFactoryRef = "ngoEntityManagerFactory",
        transactionManagerRef = "ngoTransactionManager"
)
public class NgoDataSourceConfig {

    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.ngo")
    public DataSource ngoDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean ngoEntityManagerFactory(
            EntityManagerFactoryBuilder builder,
            @Qualifier("ngoDataSource") DataSource dataSource) {
        return builder
                .dataSource(dataSource)
                .packages("com.ngo.auth.entity")
                .persistenceUnit("ngo")
                .build();
    }

    @Bean
    public JpaTransactionManager ngoTransactionManager(
            @Qualifier("ngoEntityManagerFactory") EntityManagerFactory entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory);
    }
}
