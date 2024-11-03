package com.rioaki.postmap.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PostMapController {

	@Value("${google.maps.api.key}")
    private String apiKey;
	
    @GetMapping({"/", "postmap"})
    public String index(Model model) {
    	model.addAttribute("apiKey", apiKey);
        return "postmap";
    }
    
}
