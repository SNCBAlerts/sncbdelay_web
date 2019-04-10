<?php

namespace drupol\sncbdelay_web\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class Index extends AbstractController
{
    /**
     * @Route("/web", name="web")
     */
    public function indexAction(Request $request)
    {
        return $this->render('@SNCBDelayWeb/web.html.twig');
    }
}
