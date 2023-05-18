package com.example.tproyalbe.security;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationEntryPoint.class);

    /**
     * QuanNLA
     * Date 24/04/2023
     * Method for handling authentication and authorization errors in web applications.
     * @param request that resulted in an <code>AuthenticationException</code>
     * @param response so that the user agent can begin authentication
     * @param authException that caused the invocation
     * @throws IOException
     * @throws ServletException
     * return void
     */
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response
            , org.springframework.security.core.AuthenticationException authException) throws IOException, ServletException {
        logger.error("Unauthorized error Message {}", authException.getMessage());
        response.sendError(HttpServletResponse.SC_FORBIDDEN, "Error -> Unauthorized");
    }
}
