package com.example.tproyalbe.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
    @Autowired
    private JwtTokenProvider jwtProvider;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    /**
     * QuanNLA
     * DATE 24/04/2023
     * Method used to authenticate the user
     * @param request
     * @param response
     * @param filterChain
     * @throws ServletException
     * @throws IOException
     * return void
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = getJwt(request);
            if(token!=null &&jwtProvider.validateToken(token)){
                String username = jwtProvider.getUserNameFromToken(token);
                UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                );
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        } catch (Exception e){
            logger.error("Không thể xác thực người dùng -> Message: {}",e);
        }
        filterChain.doFilter(request,response);
    }

    /**
     * QuanNLA
     * DATE 24/04/2023
     * Method to use to get the JWT from the Authorization field of the HTTP request header.
     * @param request
     * @return
     * If the Authorization field has no value or does not begin with "Bearer", the method returns null, else return jwt
     */
    public String getJwt(HttpServletRequest request){
        String authHeader = request.getHeader("Authorization");
        if(authHeader != null && authHeader.startsWith("Bearer")){
            return authHeader.replace("Bearer","");
        }
        return  null;
    }
}
