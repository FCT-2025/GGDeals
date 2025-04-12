package com.ggdeal;

import org.springframework.boot.SpringApplication;

public class TestGgDealApiApplication {

	public static void main(String[] args) {
		SpringApplication.from(GgDealApiApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
